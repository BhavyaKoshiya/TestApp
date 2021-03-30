/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Index from './App/index.js';
// import messaging from '@react-native-firebase/messaging';

import {name as appName} from './app.json';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });


AppRegistry.registerComponent(appName, () => Index);
