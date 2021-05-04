import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, ToastAndroid } from "react-native";
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType } from '@react-native-firebase/admob';
import { Header } from "../Component/Header";
// import NativeAdView, {
//     CallToActionView,
//     IconView,
//     HeadlineView,
//     TaglineView,
//     AdvertiserView,
//     AdBadge,
//   } from 'react-native-admob-native-ads';

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
        <View style={{ flex: 1 }} >
            <Header
                title='Admob ADS'
            />
            <View style={{ flex: 1, padding: 10 }} >
                <ScrollView>
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
                    <View style={{ height: 10 }} />
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
                    <View style={{ height: 10 }} />
                    <Text>ADAPTIVE BANNER</Text>
                    <View style={{ height: 10 }} />
                    <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ADAPTIVE_BANNER} />
                    <View style={{ height: 10 }} />
                    <Text>SMART BANNER</Text>
                    <View style={{ height: 10 }} />

                    <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.SMART_BANNER} />
                    <View style={{ height: 10 }} />
                    <Text>WIDE SKYSCRAPPER BANNER</Text>
                    <View style={{ height: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
                        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
                    </View>
                    <View style={{ height: 10 }} />
                    {/* <Text>NATIVE</Text>
                <View style={{ height: 10 }} />
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.WIDE_SKYSCRAPER} />
            </View> */}



                </ScrollView>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#9a09ff',
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

