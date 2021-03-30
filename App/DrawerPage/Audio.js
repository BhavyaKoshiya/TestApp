import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { pauseIcon, playIcon, stopIcon, speakerIcon, rePlayIcon } from "../assets/icon/index";
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';


export default function AudioPlayer(props) {
    const audioPath = AudioUtils.DownloadsDirectoryPath + '/test.aac';
    //    const demoTime = 18550;
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(true);
    const [recPaused, setRecPaused] = useState(true);
    const [stopRecording, setStopRecording] = useState(false);
    const [finished, setFinished] = useState(false);
    const [audio, setAudio] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentRecTime, setCurrentRecTime] = useState(0);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    var sound = null;
    var Interval;


    useEffect(() => {
        RecPath();
        AudioRecorder.onProgress = (data) => {
            setCurrentRecTime(Math.floor(data.currentTime));
        };
    }, []);

    // console.log(audioPath);
    function RecPath() {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000,
        });
    }

    const formatTime = (secs) => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);
        let hour = Math.floor(minutes / 60);
        if (seconds < 10) seconds = `0${seconds}`;

        if (hour > 0) {
            minutes = Math.ceil(minutes - hour * 60);
            if (minutes < 10) minutes = `0${minutes}`;
            return `${hour}:${minutes}:${seconds}`
        } else {
            return `${minutes}:${seconds}`
        }
    };


    const StartRec = async () => {

        if (recording) {
            console.warn('Already recording!');
            return;
        }

        if (stopRecording) {
            RecPath();
        }

        //  this.setState({ recording: true, paused: false });
        setRecording(true);
        setRecPaused(false);

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    const pauseRec = async () => {
        if (!recording) {
            console.warn('Can\'t pause, not recording!');
            return;
        }

        try {
            const filePath = await AudioRecorder.pauseRecording();
            // this.setState({ paused: true });
            setRecPaused(true);
        } catch (error) {
            console.error(error);
        }
    }


    const resumeRec = async () => {
        if (!recPaused) {
            console.warn('Can\'t resume, not paused!');
            return;
        }

        try {
            await AudioRecorder.resumeRecording();
            // this.setState({ paused: false });
            setRecPaused(false);
        } catch (error) {
            console.error(error);
        }
    }

    const stopRec = async () => {
        if (!recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        // this.setState({ stoppedRecording: true, recording: false, paused: false });
        setStopRecording(true);
        setRecording(false);
        setRecPaused(true);

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    const finishRecording = (didSucceed, filePath, fileSize) => {
        //this.setState({ finished: didSucceed });
        setFinished(didSucceed)
        console.log(`Finished Recording of Duration: ${currentRecTime} Seconds at path: ${filePath}`);
    }


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> AUDIO PLAYER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    function playAudio() {
        sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                //console.log(sound);
                setDuration(sound['_duration']);
                Interval = setInterval(
                    () =>
                        sound.getCurrentTime((seconds) => {
                            setCurrentPlayTime(seconds);
                            //console.log('at ' + Math.floor(seconds));
                        }),
                    100,
                );

                sound.play((success) => {
                    if (success) {
                        clearInterval(Interval);
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }
        });
    }

    const pauseAudio = (sound) => {
        try {

            // sound.pause();
            // setPaused(true)
            // console.log(paused);

            sound.pause(() => {
                setPaused(true)
            })

        } catch (e) {
            alert('Cannot play the file')
            console.log('cannot play the audio file', e)
        }
    };

    const stopAudio = () => {
        try {
            sound.stop(() => {
                setAudioLoaded(false)
                setPaused(true)
                //  sound.play();
            });

        } catch (e) {
            console.log('Cannot play the audio file: ', e);
        }
    };

    const onSeeking = (currentPlayTime) => {
        setCurrentPlayTime(currentPlayTime);
    }


    return (

        <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>Sound Recorder</Text>
            <View style={{ alignItems: 'center' }}>


                {/* DemoTIme */}
                {/* <Text style={{ color: 'dodgerblue', fontSize: 40, padding: 20 }}>{formatTime(demoTime)}</Text> */}

                <Text style={{ color: 'dodgerblue', fontSize: 40, padding: 20 }}>{formatTime(currentRecTime)}</Text>

                <View style={{ flexDirection: 'row' }}>
                    {/* Start Recording */}
                    <TouchableOpacity
                        onPress={StartRec}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={rePlayIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>
                    <View style={{ height: 5 }} />

                    {/* Pause/Resume Recording */}
                    <TouchableOpacity
                        onPress={recPaused ? resumeRec : pauseRec}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={recPaused ? playIcon : pauseIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>
                    <View style={{ height: 5 }} />

                    {/* Stop Recording */}
                    <TouchableOpacity
                        onPress={stopRec}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={stopIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>
                </View></View>
            <View style={{ height: 5 }} />

            {/* Audio player */}

            <Text style={{ color: '#fff', marginVertical: 50, fontSize: 20, alignSelf: 'center' }}>Audio Player</Text>

            <View style={{ alignItems: 'center' }}>


                <View style={{ flexDirection: 'row' }}>


                    <TouchableOpacity
                        onPress={paused ? playAudio : pauseAudio}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={paused ? playIcon : pauseIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={stopAudio}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={stopIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{ padding: 30 }}>
                <Slider
                    minimumValue={0}
                    value={currentPlayTime}
                    maximumValue={duration}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="#fff"
                    thumbTintColor='dodgerblue'
                    onValueChange={onSeeking}
                // onSlidingComplete={onSeek}

                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={{ color: 'white' }}>{formatTime(currentPlayTime)}</Text>
                    <Text style={{ color: 'white' }}>{formatTime(duration)}</Text>
                </View>

                {/* <View style={{ flexDirection: 'row', padding: 20 }}>
                    <Image source={speakerIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    <View style={{ width: '40%' }}>
                        <Slider
                            minimumValue={0}
                            value={audio}
                            maximumValue={2}
                            minimumTrackTintColor="dodgerblue"
                            maximumTrackTintColor="#fff"
                            thumbTintColor='dodgerblue'
                            onValueChange={volume}
                        // onSlidingComplete={onSeek}
                        />
                    </View>
                </View> */}
            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});


