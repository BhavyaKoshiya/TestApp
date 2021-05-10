import React, { useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import VideoPlayer from "./DrawerPage/Video";
import Profile from "./DrawerPage/Profile";
import Gallery from "./DrawerPage/Gallery";
import AudioPlayer from "./DrawerPage/Audio";
import Web from "./DrawerPage/WebView";
import RealTimeDB from "./DrawerPage/realtimeDB";
import Share from "./DrawerPage/Share";
import Login from './DrawerPage/Login';
import Signup from './DrawerPage/Signup';
import Home from './DrawerPage/home';
import Update from './DrawerPage/Update';
import Firestore from './DrawerPage/firestore';
import CloudStorage from './DrawerPage/CloudStorage';
import Ads from './DrawerPage/Ads';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';
import { DrawerContent } from "./DrawerContent";
import { Dimensions } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import FBads from './DrawerPage/FBads';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerTab() {

    return (

        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            drawerStyle={{ width: Dimensions.get('window').width * 0.80 }}
        >
            <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            <Drawer.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }} />
            <Drawer.Screen name="VideoPlayer" component={VideoPlayer} options={{ title: 'Video Player' }} />
            <Drawer.Screen name="AudioPlayer" component={AudioPlayer} options={{ title: 'Audio Recoreder/Player' }} />
            <Drawer.Screen name="Web" component={Web} options={{ title: 'Web' }} />
            <Drawer.Screen name="RealTimeDB" component={RealTimeDB} options={{ title: 'RealTimeDB' }} />
            <Drawer.Screen name="Firestore" component={Firestore} options={{ title: 'Firestore' }} />
            <Drawer.Screen name="CloudStorage" component={CloudStorage} options={{ title: 'CloudStorage' }} />
            <Drawer.Screen name="Ads" component={Ads} options={{ title: 'Ads' }} />
            <Drawer.Screen name="FBads" component={FBads} options={{ title: 'Help' }} />
            <Drawer.Screen name="Share" component={Share} options={{ title: 'Share' }} />

        </Drawer.Navigator>
    )
}

const handleDynamicLink = link => {
    alert('Foreground: ' + link.url);
};

export default function Index() {

    useEffect(() => {
        Orientation.lockToPortrait();
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                alert('Background: ' + link.url);
            }).catch(error => {
                // console.log(error);
            });
        return () => unsubscribe();
    }, [])
    const navigationRef = useRef();
    const routeNameRef = useRef();

    return (

        <NavigationContainer
            ref={navigationRef}
            onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName
                    });
                }
                routeNameRef.current = currentRouteName;
            }}
        >

            <Stack.Navigator headerMode='none'            >
                <Stack.Screen name='Drawer' component={DrawerTab} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Update" component={Update} />
            </Stack.Navigator>

        </NavigationContainer >
    );
}
