import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid, PermissionsAndroid } from "react-native";
import { pauseIcon, playIcon, stopIcon, } from "../assets/icon/index";
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import { Header } from "../Component/Header";


export default function AudioPlayer(props) {
    const audioPath = AudioUtils.DownloadsDirectoryPath + '/test.aac';
    const [time, setTime] = useState(0);
    const [STATUS, setStatus] = useState('STOP');
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [sound, setSound] = useState(null);
    const [isplaying, setIsPlaying] = useState(false);
    var Interval;

    const sliderRef = useRef(null);

    useEffect(() => {
        //_load()
    }, []);
    useEffect(() => {
        // checkPemissions();
        AudioRecorder.onProgress = (data) => {
            setTime(Math.floor(data.currentTime));
        };
    }, []);

    const checkPemissions = async () => {

        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

        if (granted) {
            console.log("You can use the Microphone")
            ToastAndroid.show("You can use the Microphone", ToastAndroid.SHORT)
        }
        else {
            console.log("Microphone permission denied")
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
            )
            // ToastAndroid.show("Microphone permission denied", ToastAndroid.SHORT)
        }
    }

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
        let granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        if (granted) {
            if (isplaying) {
                ToastAndroid.show("Please Pause Audio Player", ToastAndroid.SHORT)
            } else {
                if (STATUS == 'STOP') {
                    try {
                        _audioPath();
                        const filePath = await AudioRecorder.startRecording();
                        setStatus('PAUSE');
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (STATUS == 'PLAY') {
                    try {
                        await AudioRecorder.resumeRecording();
                        setStatus('PAUSE');
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (STATUS == 'PAUSE') {
                    try {
                        const filePath = await AudioRecorder.pauseRecording();
                        setStatus('PLAY');
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
        else {
            // console.log("Microphone permission denied")
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("You can use the location")
                // alert("You can use the location");
            } else {
                ToastAndroid.show("Microphone permission denied", ToastAndroid.SHORT)
            }
            // ToastAndroid.show("Microphone permission denied", ToastAndroid.SHORT)
        }
    }

    async function StopRecording() {
        if (STATUS == 'PLAY' || STATUS == 'PAUSE') {
            try {
                const filePath = await AudioRecorder.stopRecording();
                AudioRecorder.onFinished = (data) => {
                    console.log(data);
                };
                setStatus('STOP');
                setTime(0);
                _load();
            } catch (error) {
                console.error(error);
            }
        } else {
            ToastAndroid.show('Please Start Recording First', ToastAndroid.SHORT);
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
                            // console.log("seconds", seconds);
                            setCurrentTime(seconds);
                            // console.log('at ' + Math.floor(seconds));
                        }),
                    100,
                );
            }
        });
    }
    function PlayAudio() {
        if (STATUS === 'PAUSE' || STATUS === 'PLAY') {
            ToastAndroid.show('Please Finish Recording First...', ToastAndroid.SHORT);
        } else {
            if (sound == null)
                return ToastAndroid.show('Please Record Sound First', ToastAndroid.SHORT);
            if (isplaying) {
                sound.PAUSE();
                setIsPlaying(false);
            } else {
                sound.play((success) => {
                    if (success) {
                        clearInterval(Interval);
                        setCurrentTime(duration);
                        setIsPlaying(false);
                        console.log('successfully finished playing');
                    } else {
                        console.log('Playback failed due to audio decoding errors');
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

            <Header title='Audio Player' />

            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>Sound Recorder</Text>
                <View style={{ alignItems: 'center' }}>


                    {/* Recording Time */}

                    <Text style={{ color: '#3875ea', fontSize: 40, padding: 20 }}>{formatTime(time)}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 5 }} />

                        {/* Start & Pause/Resume Recording */}
                        <TouchableOpacity
                            onPress={RecordAudio}
                            style={{ paddingHorizontal: 15 }}
                        >
                            <Image source={STATUS == 'STOP' || STATUS == 'PLAY' ? playIcon : pauseIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
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
                        value={currentTime}
                        ref={sliderRef}
                        minimumValue={0}
                        minimumTrackTintColor="#3875ea"
                        maximumTrackTintColor="#fff"
                        thumbTintColor='#3875ea'
                        onValueChange={(value) => {
                            console.log("value", value);
                            sound.setCurrentTime(value);
                            sliderRef.current.setNativeProps({ value: value });
                        }}
                        maximumValue={duration}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ color: 'white' }}>{formatTime(currentTime)}</Text>
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


