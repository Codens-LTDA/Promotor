import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import RNBeep from 'react-native-a-beep';
import Colors from '../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../utils/BackHandler';

const Scanner2 = props => {
    console.log('asd')
    const [isBarcodeRead, setIsBarcodeRead] = useState(false);
    const navigation = useNavigation();
    const page = props.page

    const delay = () => {
        setTimeout(() => {
            setIsBarcodeRead(false);
        }, 2500);        
    }

    function handleBackClick() {
        props.setShowScanner(false);
    }

    useEffect(() => {
        handleAndroidBackButton(handleBackClick);
        removeAndroidBackButtonHandler();
    }, []);

    const PendingView = () => (
        <View
            style={{
                flex: 1,
                width: 600,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text />
        </View>
    );

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
                onBarCodeRead={value => {
                    if (!isBarcodeRead) {
                        RNBeep.beep();
                            props.handle(value.data);
                            setIsBarcodeRead(true);
                              delay()
                            props.setShowScanner(false);
                    }
                }}
                androidCameraPermissionOptions={{
                    title: 'Permissão para usar a câmera',
                    message: 'Precisamos de sua permissão para usar a câmera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancelar',
                }}
                >
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <PendingView />;
                    return <View style={styles.redline} />;
                }}
                
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redline: {
        height: 5,
        width: 600,
        backgroundColor: '#ff0000aa',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    text: {
        color: Colors.white,
        fontSize: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    containertop: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.blue,
    },
    containerrequest: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.blue,
    },
    topright: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topicon: {
        width: '30%',
        justifyContent: 'center',
        color: Colors.white,
        marginLeft: 10,
    },
    icon: {
        color: Colors.white,
    },
    textsolicitation: {
        padding: 10,
        paddingTop: 35,
        textAlign: 'center',
        color: Colors.white,
    }
});

export default Scanner2;