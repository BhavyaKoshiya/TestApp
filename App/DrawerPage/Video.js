import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { pauseIcon, playIcon, forward10Icon, backward10Icon, rePlayIcon, } from "../assets/icon/index";
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';


export default function VideoPlayer(props) {

    const PLAYER_STATES = [{
        PLAYING: 0,
        PAUSED: 1,
        ENDED: 2
    }]

    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);

    const formatTime = (secs) => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);
        if (seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`
    };



    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onBackward = (seek) => {
        videoPlayer?.current.seek(currentTime - 10);
    };

    const onForward = (seek) => {
        videoPlayer?.current.seek(currentTime + 10);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        setPlayerState(PLAYER_STATES.PLAYING);
        setPaused(false);
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
        setPaused(true);
    };


    return (
        <View style={{ flex: 1, }}>

            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={'contain'}
                source={{ uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" }}
                style={styles.backgroundVideo}
            />

            <View style={styles.controls}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        onPress={onBackward}
                        style={{ paddingHorizontal: 15, marginBottom: 10 }}
                    >
                        <Image source={backward10Icon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>

                    {
                        currentTime === duration ?
                            <TouchableOpacity
                                onPress={onReplay}
                                style={{ paddingHorizontal: 15, marginBottom: 10 }}
                            >
                                <Image source={rePlayIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={onPaused}
                                style={{ paddingHorizontal: 15, marginBottom: 10 }}
                            >
                                <Image source={paused ? playIcon : pauseIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                            </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={onForward}
                        style={{ paddingHorizontal: 15, marginBottom: 10 }}
                    >
                        <Image source={forward10Icon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                    </TouchableOpacity>

                </View>
                
                <Slider
                    minimumValue={0}
                    value={currentTime}
                    maximumValue={duration}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="#fff"
                    thumbTintColor='dodgerblue'
                    onValueChange={onSeeking}
                    onSlidingComplete={onSeek}

                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={{ color: 'white' }}>{formatTime(currentTime)}</Text>
                    <Text style={{ color: 'white' }}>-{formatTime(duration - currentTime)}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        flex: 1,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
});