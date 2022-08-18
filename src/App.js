import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

//import SplashScreen from 'react-native-splash-screen';
import Navigation from './navigation/index';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation />
      <FlashMessage position="top"/>      
    </>
  );
};

export default App;