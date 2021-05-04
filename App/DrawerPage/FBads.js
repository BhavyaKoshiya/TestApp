import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";
import {
    InterstitialAdManager,
    BannerView,
    AdIconView,
    MediaView,
    AdChoicesView,
    TriggerableView,
    NativeAdsManager,
    withNativeAd,
} from 'react-native-fbads';
import { Header } from "../Component/Header";

const adsManager = new NativeAdsManager('429478654990775_477054126899894', 10);

export default function FBads(props) {

    // const nativeAdViewRef = useRef();

    // const __onNativeAd = () => {
    //     console.log(nativeAdViewRef);
    //     try {
    //         nativeAdViewRef.current?.loadAd();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const InterstitialAd = () => {
        InterstitialAdManager.showAd('429478654990775_455647165707257')
            .then((didClick) => console.log(' InterstitialAd Click', didClick))
            .catch((error) => console.log('InterstitialAd error', error));
    }
    return (
        <View style={{ flex: 1 }}>
             <Header
                title='Facebook ADS'
            />
            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.titleText}>Facebook ADs</Text>
            </View> */}
            {/* <View style={{ height: 20 }} /> */}
            <View>
                <AdComponent adsManager={adsManager} />
            </View>
            <View style={{ height: 20 }} />


            <Text>Banner- Standard</Text>
            <BannerView
                placementId="429478654990775_455691985702775"
                type="standard"
                onPress={() => ToastAndroid.show("Banner click", ToastAndroid.SHORT)}
                onLoad={() => ToastAndroid.show("Banner loaded", ToastAndroid.SHORT)}
                onError={(err) => console.log('Banner Standard error', err)}
            />
            <View style={{ height: 20 }} />
            <Text>Banner- Large</Text>
            <BannerView
                placementId="429478654990775_455691985702775"
                type="large"
                onPress={() => ToastAndroid.show("Banner click", ToastAndroid.SHORT)}
                onLoad={() => ToastAndroid.show("Banner loaded", ToastAndroid.SHORT)}
                onError={(err) => console.log('Banner Large error', err)}
            />
            <View style={{ height: 20 }} />
            <TouchableOpacity
                style={styles.button}
                onPress={InterstitialAd}
            >
                <Text style={{ fontSize: 20, color: 'white', paddingHorizontal: 25 }}>InterstitialAd</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#ea8478',
        borderRadius: 30,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    titleText: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#595959',
        marginTop: 50
    },
});

class MyAd extends React.Component {
    render() {
        // console.log(this.props.nativeAd.bodyText);
        return (
            <View>
                <AdChoicesView />
                <AdIconView style={{ width: 50, height: 50 }} />
                <TriggerableView>
                    <Text style={{ fontWeight: 'bold' }}>
                        {this.props.nativeAd.headline}
                    </Text>
                    <Text> {this.props.nativeAd.bodyText}</Text>
                </TriggerableView>
                <MediaView style={{ width: 160, height: 90 }} />
                
            </View>
        );
    }
}

export const AdComponent = withNativeAd(MyAd);