import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BannerView, InterstitialAdManager } from 'react-native-fbads';


export default function FBads(props) {


    const InterstitialAd = () => {
        InterstitialAdManager.showAd('429478654990775_455647165707257')
            .then((didClick) => console.log('didClick', didClick))
            .catch((error) => console.log('error', error));
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.titleText}>Facebook ADs</Text>
            </View>
            <View style={{ height: 20 }} />
            <TouchableOpacity
                style={styles.button}
                onPress={InterstitialAd}
            >
                <Text style={{ fontSize: 20, color: 'white', paddingHorizontal: 25 }}>InterstitialAd</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <Text>Banner- Standard</Text>
            <BannerView
                placementId="429478654990775_455691985702775"
                type="standard"
                onPress={() => console.log('click')}
                onLoad={() => console.log('loaded')}
                onError={(err) => console.log('error', err)}
            />
            <View style={{ height: 20 }} />
            <Text>Banner- Large</Text>
            <BannerView
                placementId="429478654990775_455691985702775"
                type="large"
                onPress={() => console.log('click')}
                onLoad={() => console.log('loaded')}
                onError={(err) => console.log('error', err)}
            />
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