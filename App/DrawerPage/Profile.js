import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import { Header } from "../Component/Header";
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

export default function Profile({ navigation }) {

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            let notifImg = JSON.stringify(remoteMessage.notification.android.imageUrl);
            let notifTitle = JSON.stringify(remoteMessage.notification.title)
            let notifBody = JSON.stringify(remoteMessage.notification.body)

            //console.log(notif);
            Alert.alert(notifTitle, notifBody + '\n Image URL: ' + notifImg);
        });

        crashlytics().log('App mounted.');

        return unsubscribe;
    }, []);

    async function onSignIn(user) {
        crashlytics().log('User signed in.');
        await Promise.all([
            crashlytics().setUserId(user.uid),
            crashlytics().setAttribute('credits', String(user.credits)),
            crashlytics().setAttributes({
                role: 'admin',
                followers: '13',
                email: user.email,
                username: user.username
            }),
        ]);
        crashlytics().crash();

    }

    const crashApp = () => {
        crashlytics().setAttributes({ something: 'something' });
        crashlytics().log('A woopsie is incoming :(');
        crashlytics().recordError(new Error('I did a woopsie'));
        crashlytics().crash();
    }


    return (
        <View style={{ flex: 1 }} >
            <Header
                title='Profile'
            />

            {/* <Text style={styles.titleText}>Profile</Text> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ flex: 1, justifyContent: 'center', }}>

                    <View >

                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => crashApp()}
                            onPress={() =>
                                onSignIn({
                                    uid: 'CYBERKING40',
                                    username: 'Joaquin Phoenix',
                                    email: 'phoenix@example.com',
                                    credits: 34,
                                })
                            }>
                            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white', paddingHorizontal: 20 }}>CRASH SignIN</Text>
                        </TouchableOpacity>
                        <View style={styles.spaceDivider} />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => crashApp()}
                        >
                            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white', paddingHorizontal: 20 }}>CRASH</Text>
                        </TouchableOpacity>

                        <View style={styles.spaceDivider} />

                        {/* <TouchableOpacity
                            style={styles.button}

                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white', paddingHorizontal: 20 }}>Signup</Text>
                        </TouchableOpacity>

                        <View style={styles.spaceDivider} />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Login')}

                        >
                            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white', paddingHorizontal: 25 }}>Log in</Text>
                        </TouchableOpacity>

                        <View style={styles.spaceDivider} />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Home')}

                        >
                            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white', paddingHorizontal: 25 }}>Home</Text>
                        </TouchableOpacity> */}

                    </View>
                    <View style={styles.spaceDivider} />

                    <View style={{ alignItems: 'center' }}>
                        <LoginButton
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                console.log(data);
                                                console.log("Login Successful with AccessToken : ", data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ea8478',
        borderRadius: 30,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    spaceDivider: {
        height: 15
    },
    titleText: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#595959',
        marginTop: 50
    },
});

