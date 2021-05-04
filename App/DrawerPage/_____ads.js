// import React, {useRef} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Button,
//   ToastAndroid,
// } from 'react-native';
// // import {
// //   AdMobBanner,
// //   AdMobInterstitial,
// //   PublisherBanner,
// //   AdMobRewarded,
// // } from 'react-native-admob';
// import {
//   InterstitialAdManager,
//   BannerView,
//   AdIconView,
//   MediaView,
//   AdChoicesView,
//   TriggerableView,
//   NativeAdsManager,
//   withNativeAd,
// } from 'react-native-fbads';

// import NativeAdView, {
//   CallToActionView,
//   IconView,
//   HeadlineView,
//   TaglineView,
//   AdvertiserView,
//   AdBadge,
// } from 'react-native-admob-native-ads';
// const adsManager = new NativeAdsManager('898853027568012_898866207566694', 10);
// export default function Index() {
//   const nativeAdViewRef = useRef();
//   const __Interstitial = () => {
//     InterstitialAdManager.showAd('898853027568012_898874570899191')
//       .then((didClick) => {})
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const __onNativeAd = () => {
//     console.log(nativeAdViewRef);
//     try {
//       nativeAdViewRef.current?.loadAd();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View>
//       <View>
//         <AdComponent adsManager={adsManager} />
//       </View>
//       <View style={{height: 10}} />
//       <BannerView
//         placementId="898853027568012_898872740899374"
//         type="standard"
//         onPress={() => console.log('click')}
//         onLoad={() => console.log('loaded')}
//         onError={(err) => console.log('error', err)}
//       />
//       <View style={{height: 10}} />
//       <Button title="Interstitial" onPress={__Interstitial} />
//       <View style={{height: 30}} />
//       {/* <NativeAdView
//         ref={nativeAdViewRef}
//         //adUnitID="ca-app-pub-3940256099942544/2247696110"
//         adUnitID="ca-app-pub-3940256099942544/2247696110"
//         onAdFailedToLoad={({error}) => {
//           ToastAndroid.show(error.message,ToastAndroid.SHORT)
//           console.log(error);
//         }}
//       /> */}
//       <View
//         style={{
//           flex: 1,
//         }}>
//         <NativeAdView
//           style={{
//             width: '95%',
//             alignSelf: 'center',
//             height: 100,
//           }}
//           ref={nativeAdViewRef}
//           adUnitID="ca-app-pub-3940256099942544/2247696110" // TEST adUnitID
//           onAdFailedToLoad={({error}) => {
//             ToastAndroid.show(error.message, ToastAndroid.SHORT);
//             console.log(error);
//           }}>
//           <View
//             style={{
//               height: 100,
//               width: '100%',
//             }}>
//             <AdBadge />
//             <View
//               style={{
//                 height: 100,
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'flex-start',
//                 alignItems: 'center',
//                 paddingHorizontal: 10,
//               }}>
//               <IconView
//                 style={{
//                   width: 60,
//                   height: 60,
//                 }}
//               />
//               <View
//                 style={{
//                   width: '65%',
//                   maxWidth: '65%',
//                   paddingHorizontal: 6,
//                 }}>
//                 <HeadlineView
//                   style={{
//                     fontWeight: 'bold',
//                     fontSize: 13,
//                   }}
//                 />
//                 <TaglineView
//                   numberOfLines={1}
//                   style={{
//                     fontSize: 11,
//                   }}
//                 />
//                 <AdvertiserView
//                   style={{
//                     fontSize: 10,
//                     color: 'gray',
//                   }}
//                 />
//               </View>

//               <CallToActionView
//                 style={{
//                   height: 45,
//                   paddingHorizontal: 12,
//                   backgroundColor: 'purple',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 5,
//                   elevation: 10,
//                 }}
//                 textStyle={{color: 'white', fontSize: 14}}
//               />
//             </View>
//           </View>
//         </NativeAdView>
//       </View>
//       <View style={{height: 10}} />
//       <Button title="google Native Ad" onPress={__onNativeAd} />
//     </View>
//   );
// }

// //export default withNativeAd(Index);
// class MyAd extends React.Component {
//   render() {
//     console.log(this.props.nativeAd.bodyText);
//     return (
//       <View>
//         <AdChoicesView style={{position: 'absolute', left: 10, top: 10}} />
//         <AdIconView style={{width: 30, height: 30}} />
//         <MediaView style={{width: 160, height: 90}} />
//         <TriggerableView>
//           <Text style={{fontWeight: 'bold'}}>
//             {this.props.nativeAd.headline}
//           </Text>
//           <Text> {this.props.nativeAd.bodyText}</Text>
//         </TriggerableView>
//       </View>
//     );
//   }
// }

// export const AdComponent = withNativeAd(MyAd);


