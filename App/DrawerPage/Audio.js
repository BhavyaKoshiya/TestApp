import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { pauseIcon, playIcon, stopIcon, speakerIcon, rePlayIcon } from "../assets/icon/index";
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import { Header } from "../Component/Header";


export default function AudioPlayer(props) {
    const audioPath = AudioUtils.DownloadsDirectoryPath + '/test.aac';
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState('start');
    const [duration, setDuration] = useState(0);
    const [currenttime, setCurrentTime] = useState(0);
    const [sound, setSound] = useState(null);
    const [isplaying, setIsPlaying] = useState(false);
    var Interval;
    useEffect(() => {
        //_load()
    }, []);
    useEffect(() => {
        AudioRecorder.onProgress = (data) => {
            setTime(Math.floor(data.currentTime));
        };
    }, []);
    function _audioPath() {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000,
        });
    }

    async function RecordAudio() {
        if (isplaying) {
            ToastAndroid.show("Plese Pause Audio Player", ToastAndroid.SHORT)
        } else {
            if (status == 'start') {
                try {
                    _audioPath();
                    const filePath = await AudioRecorder.startRecording();
                    setStatus('pause');
                } catch (error) {
                    console.error(error);
                }
            }
            if (status == 'play') {
                try {
                    await AudioRecorder.resumeRecording();
                    setStatus('pause');
                } catch (error) {
                    console.error(error);
                }
            }
            if (status == 'pause') {
                try {
                    const filePath = await AudioRecorder.pauseRecording();
                    setStatus('play');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    async function StopRecording() {
        try {
            const filePath = await AudioRecorder.stopRecording();
            AudioRecorder.onFinished = (data) => {
                console.log(data);
            };
            setStatus('start');
            setTime(0);
            _load();
        } catch (error) {
            console.error(error);
        }
    }
    function _load() {
        if (sound) {
            sound.release();
        }

        let soundref = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                ToastAndroid.show('failed to load the sound', ToastAndroid.SHORT);
                console.log('failed to load the sound', error);
            } else {
                // sound.setCurrentTime(0);

                setIsPlaying(false);
                setSound(soundref);
                // console.log(soundref.getCurrentTime);
                //setCurrentTime(0);
                // soundref.setCurrentTime(0)
                setDuration(soundref['_duration']);
                Interval = setInterval(
                    () =>
                        soundref.getCurrentTime((seconds) => {
                            setCurrentTime(seconds);
                            // console.log('at ' + Math.floor(seconds));
                        }),
                    100,
                );
            }
        });
    }
    function PlayAudio() {
        if (status === 'pause' || status === 'play') {
            ToastAndroid.show('Please Finish Recording First...', ToastAndroid.SHORT);
        } else {
            if (sound == null)
                return ToastAndroid.show('Please Load First', ToastAndroid.SHORT);
            if (isplaying) {
                sound.pause();
                setIsPlaying(false);
            } else {
                sound.play((success) => {
                    if (success) {
                        clearInterval(Interval);
                        setCurrentTime(duration);
                        setIsPlaying(false);
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
                setIsPlaying(true);
            }
        }
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

    return (

        <View style={styles.container}>
             <Header
                title='Audio Player'
            />
            <View style={{flex:1, justifyContent: 'center',}}>
            <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>Sound Recorder</Text>
            <View style={{ alignItems: 'center' }}>


                {/* Recording Time */}

                <Text style={{ color: 'dodgerblue', fontSize: 40, padding: 20 }}>{formatTime(time)}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 5 }} />

                    {/* Start & Pause/Resume Recording */}
                    <TouchableOpacity
                        onPress={RecordAudio}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={status == 'start' || status == 'play' ? playIcon : pauseIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>
                    <View style={{ height: 5 }} />

                    {/* Stop Recording */}
                    <TouchableOpacity
                        onPress={StopRecording}
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
                        onPress={PlayAudio}
                        style={{ paddingHorizontal: 15 }}
                    >
                        <Image source={isplaying ? pauseIcon : playIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{ padding: 30 }}>
                <Slider
                    value={currenttime}
                    minimumValue={0}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="#fff"
                    thumbTintColor='dodgerblue'
                    onValueChange={(value) => {
                        sound.setCurrentTime(value);
                    }}
                    maximumValue={duration}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={{ color: 'white' }}>{formatTime(currenttime)}</Text>
                    <Text style={{ color: 'white' }}>{formatTime(duration)}</Text>
                </View>

            </View>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        // justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});


