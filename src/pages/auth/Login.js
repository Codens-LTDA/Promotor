import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import logo from '../../assets/images/logo_tms.png';
import userinput from '../../assets/images/feather-user.png';
import key from '../../assets/images/feather-key.png';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context';
import api from '../../services/api';
import Splash from './Splash';
import OneSignal from 'react-native-onesignal';

const Login = ({route, navigation}) => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [usercode, setUsercode] = React.useState('');
  const {signIn} = React.useContext(AuthContext);
  const [loginTry, setLoginTry] = React.useState(false);

  const onPressLogin = () => {
    handleSubmit();
  };

  const onPressFastLogin = () => {
    navigation.navigate('Scanner', {from: 'login'});
  };

  async function getDevice(iduser) {
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

    const deviceState = await OneSignal.getDeviceState();

    const userid = await AsyncStorage.getItem('userid');
    //insert extern user in onsignal device
    const response = await api.get('/adddevice', {
      app_id: '9ccd3a9f-829b-440d-a445-9e567b02c4a7',
      identifier: deviceState.pushToken,
      external_user_id: iduser,
    });

    console.log(deviceState.pushToken);
    console.log(response.data.id);
    console.log(iduser);

    //insert device vinculate user
    const response2 = await api
      .get('/deviceuser', {
        usu_token_onesignal: deviceState.pushToken,
        usu_id_onesignal: response.data.id,
        id: iduser,
      })
      .then(function (data) {});
  }

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        const response = await api.post('/login', {
          user,
          pass: password,
          token: 'any_string',
          app_origin: 'react',
        });
        getDevice(response.data.data.id);
        proceed(response);
      } catch (err) {
        console.log(err);
        if (err.status == 401) {
          alert('Login ou senha inválidos!');
        }
      }
      return;
    }
  };

  const validateInputs = () => {
    if (!user.length) {
      alert('Informe um usuário!');
      return false;
    }

    if (!password.length) {
      alert('Informe a senha!');
      return false;
    }

    return true;
  };

  const proceed = async response => {
    try {
      await AsyncStorage.setItem('username', response.data.data.name);
      await AsyncStorage.setItem('userid', response.data.data.id);
      await AsyncStorage.setItem('usernivel', response.data.data.nivel);
      await AsyncStorage.setItem('token', '#$%@@11aaa2444adafJJJhha¨¨553');
    } catch (e) {
      console.log(e);
    }

    signIn();
  };

  const logUser = async () => {
    setIsLoading(true);

    if (!usercode) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/loginFast', {
        usercode,
        token: 'any_string',
        app_origin: 'react',
      });

      proceed(response);
      setUsercode('');
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        setIsLoading(false);
        alert('Login ou senha inválidos!');
        setLoginTry(true);
        setUsercode('');
        navigation.push('Login');
      }
    }
  };

  React.useEffect(() => {
    setIsLoading(false);

    if (route.params && !loginTry) {
      const code = route.params.qrvalue;
      if (code) {
        setUsercode(code);
        logUser();
      }
    }
  });

  if (isLoading) {
    return <Splash />;
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios' || Platform.OS === 'android'}
      behavior="padding"
      style={styles.main}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.SectionStyle}>
        <Image source={userinput} style={styles.ImageStyle} />
        <TextInput
          style={{flex: 1, color: Colors.black}}
          placeholder="Usuário"
          onChangeText={text => setUser(text)}
          value={user}
          onSubmitEditing={handleSubmit}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.SectionStyle}>
        <Image source={key} style={styles.ImageStyle} />
        <TextInput
          style={{flex: 1, color: Colors.black}}
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          value={password}
          onSubmitEditing={handleSubmit}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonFirst} onPress={onPressLogin}>
          <Text style={styles.buttonsText}>Acessar</Text>
        </TouchableOpacity>
      </View>
      {/*
			<Text style={styles.buttonsDevider}>ou</Text>
			<TouchableOpacity style={styles.button} onPress={onPressFastLogin}>
			<Image
			source={require('../../assets/images/metro-qrcode.png')}
			style={styles.ImageStyle}
			/>
			<Text style={styles.buttonsText}>Acesso Rápido</Text>
		</TouchableOpacity>
			*/}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 70,
    height: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonFirst: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonsText: {
    color: Colors.white,
    fontSize: 16,
  },
  buttonsDevider: {
    color: Colors.black,
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 16,
    marginTop: 15,
  },
});

export default Login;
