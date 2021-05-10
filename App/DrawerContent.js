import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {
    userIcon, myImage, galleryIcon, facebookIcon, shareIcon, groupIcon, webIcon, videoIcon, micIcon, dbIcon, todoIcon, uploadIcon, adsIcon,
} from "./assets/icon/index";
import { DrawerItem } from './Component/DrawerItem';


export function DrawerContent({ state, navigation }) {

    const activeIndex = state.index;
    //  console.log(activeIndex);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/blueBackground.jpg')}
                style={{ paddingHorizontal: 20 }}
            >
                <View style={{ height: 5 }} />
                <View style={styles.imageContainer}>
                    <Image
                        source={myImage}
                        style={styles.image}
                    />
                </View>
                <View style={{ height: 25 }} />

                <Text style={styles.header}>Bhavya Koshiya</Text>
                <View style={{ height: 5 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>282M Followers</Text>
                    <Image source={groupIcon} style={{ height: 16, width: 16, marginHorizontal: 5, tintColor: '#fff' }}></Image>
                </View>
                <View style={styles.spaceDivider} />

            </ImageBackground>
            <View style={styles.divider} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode='never'
                style={{ flex: 1, paddingHorizontal: 20 }}
            >
                <View style={{ height: 20 }} />

                <DrawerItem
                    onPress={() => { navigation.navigate('Profile') }}
                    source={userIcon}
                    title='Profile'
                    isActive={activeIndex === 0}
                />

                <View style={styles.spaceDivider} />

                <DrawerItem
                    onPress={() => { navigation.navigate('Gallery') }}
                    source={galleryIcon}
                    title='Gallery'
                    isActive={activeIndex === 1}
                />


                <View style={styles.spaceDivider} />

                <DrawerItem
                    onPress={() => { navigation.navigate('VideoPlayer') }}
                    source={videoIcon}
                    title='Video Player'
                    isActive={activeIndex === 2}
                />

                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('AudioPlayer') }}
                    source={micIcon}
                    title='Audio Recorder/Player'
                    isActive={activeIndex === 3}
                />

                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('Web') }}
                    source={webIcon}
                    title='Web'
                    isActive={activeIndex === 4}
                />

                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('RealTimeDB') }}
                    source={dbIcon}
                    title='Realtime DataBase'
                    isActive={activeIndex === 5}
                />

                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('Firestore') }}
                    source={todoIcon}
                    title='TODO - Cloud Firestore'
                    isActive={activeIndex === 6}
                />
                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('CloudStorage') }}
                    source={uploadIcon}
                    title='Cloud Storage'
                    isActive={activeIndex === 7}
                />

                <View style={styles.spaceDivider} />

                <DrawerItem
                    onPress={() => { navigation.navigate('Ads') }}
                    source={adsIcon}
                    title='Admob ADS'
                    isActive={activeIndex === 8}
                />
                <View style={styles.spaceDivider} />
                <DrawerItem
                    onPress={() => { navigation.navigate('FBads') }}
                    source={facebookIcon}
                    title='Facebook ADs'
                    isActive={activeIndex === 9}
                />

                <View style={styles.spaceDivider} />

                <DrawerItem
                    onPress={() => { navigation.navigate('Share') }}
                    source={shareIcon}
                    title='Tell a Friend'
                    isActive={activeIndex === 10}
                />

                <View style={styles.spaceDivider} />

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    tabIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 10,
        tintColor: '#000',
        paddingHorizontal: 20

    },
    tabTitle: {
        fontSize: 18,

    },
    spaceDivider: {
        height: 10,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgrey'
    },
    imageContainer: {

        height: 85,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#3875ea',
        borderRadius: 85,
        marginTop: 20

    },
    image: {

        height: 80,
        width: 80,
        borderRadius: 80,
    },

})