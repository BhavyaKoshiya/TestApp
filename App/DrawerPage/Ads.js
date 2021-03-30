import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, ToastAndroid } from "react-native";
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType } from '@react-native-firebase/admob';


const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export default function Ads({ navigation }) {

    const [interstitialLoaded, setInterstitialLoaded] = useState(false);
    const [rewardLoaded, setRewardLoaded] = useState(false);


    useEffect(() => {

        const interstitialListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setInterstitialLoaded(true);

            }
        });

        const rewardListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                setRewardLoaded(true);
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of ', reward);
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            rewardListener();
            interstitialListener();
        };

    }, []);


    return (
        <ScrollView style={{ flex: 1, padding: 10 }} >
            <Text style={styles.titleText}>Admob ADS</Text>
            <Button
                title="Show Interstitial ad"
                onPress={() => {
                    if (interstitialLoaded == true) {
                        interstitial.show();
                    } else {
                        ToastAndroid.show("Interstitial AD not loaded please wait!", ToastAndroid.SHORT);
                    }

                }}
            />
            <View style={{height:10}} />
            <Button
                title="Show Rewarded ad"
                onPress={() => {
                    if (rewardLoaded == true) {
                        rewarded.show();
                    } else {
                        ToastAndroid.show("Rewarded AD not loaded please wait!", ToastAndroid.SHORT);
                    }

                }}
            />

            <Text>ADAPTIVE BANNER</Text>
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ADAPTIVE_BANNER} />
            <Text>SMART BANNER</Text>

            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.SMART_BANNER} />
            <Text>WIDE SKYSCRAPER BANNER</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
            </View>


        </ScrollView>
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
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#595959',
        marginBottom: 20,

    },
});

