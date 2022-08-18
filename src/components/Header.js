import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import arrow from '../assets/images/arrow_down.png';
import arrows from '../assets/images/arrows.png';
import logotms from '../assets/images/logo_tms.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [userName, setUserName] = React.useState('');
    const { signOut } = React.useContext(AuthContext);

    console.log(signOut)
    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadName = async () => {
                const userName = await AsyncStorage.getItem('username');
                setUserName(userName);
            };
            loadName();
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.inline}>
                <Image source={logotms} style={styles.logotms}/>
            </View>
            <View style={styles.containerola}>
                <Text style={styles.textStrong}>Olá {userName}!</Text>
            </View>
            <TouchableOpacity style={styles.arrow_down} onPress={signOut}>
                <View style={styles.containerexit}>
                    <View style={styles.exit}>
                        <Text>Sair</Text>
                    </View>
                    <View style={styles.iconexit}>
                        <FontAwesomeIcon icon={faDoorOpen} size={30} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 55,
        marginTop: -1,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 7,
        backgroundColor: Colors.white,
    },
    inline: {
        width: '25%', 
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textStrong: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 12,
    },
    arrow_down: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logotms: {
        width: 80,
        resizeMode: 'contain', 
    },
    containerexit: {
        display: 'flex',
        flexDirection: 'row', 
    },
    exit: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    iconexit: {
        marginRight: 33,
    },
    containerola: {
        width: 170,
        paddingTop: 3,
    }

});

export default Header;