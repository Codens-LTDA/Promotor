import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

//import SplashScreen from 'react-native-splash-screen';
import Navigation from './navigation/index';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';

const App = () => {
  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('9ccd3a9f-829b-440d-a445-9e567b02c4a7');
  //END OneSignal Init Code

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });

  useEffect(() => {
    async function closeSplash() {
      SplashScreen.hide();
    }
    closeSplash();
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
