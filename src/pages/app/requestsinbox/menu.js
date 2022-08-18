import React, { useState } from 'react';
import Colors from '../../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBox, faBoxOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import api from '../../../services/api';
import { showMessage, hideMessage } from "react-native-flash-message";

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const Menu = ({ qrbox, idbox, navigation, userid }) => {
    const Readbox = () => {
        navigation.navigate('Processrequest', {
            page: 'readrequestagain', idbox: idbox, qrbox: qrbox
        });
    }

    async function Finishbox() {
        const response = await api.post('/finishbox', {
            token: 'any_string',
            app_origin: 'react',
            idbox: idbox,
            promoter: userid

        }).then((res) => {
            showMessage({
                message: "Caixa finalizada com sucesso",
                type: "success",
            });

            setTimeout(() => {
                navigation.navigate('Home', {
                    page: 'home', job: 'reload'
                });
            }, 500);
        }).catch((err) => {
            showMessage({
                message: `Não foi possível finalizar esta caixa`,
                type: "danger",
            });
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxbottom1}>
                <TouchableOpacity style={styles.touchb1} onPress={Readbox}>
                    <View style={styles.containerbt}>
                        <View style={styles.container1bt}>
                            <FontAwesomeIcon icon={faFile} style={styles.iconmenu} size={38} />
                        </View>
                        <View style={styles.container2bt}>
                            <Text style={styles.texttouch}>Ler solicitação</Text>
                            <Text style={styles.textlittle}>Leia a próx solicitação</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.boxbottom2}>
                <TouchableOpacity style={styles.touchb2} onPress={Finishbox}>
                    <View style={styles.containerbt}>
                        <View style={styles.container1bt2}>
                            <FontAwesomeIcon icon={faBox} style={styles.iconmenu} size={30} />
                        </View>
                        <View style={styles.container2bt2}>
                            <Text style={styles.texttouch}>Finalizar</Text>
                            <Text style={styles.textlittle}>Finalize a caixa</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 6,
    },
    boxbottom1: {
        width: '50%',
    },
    boxbottom2: {
        width: '50%',
        alignItems: 'flex-end',
    },
    touchb1: {
        borderRadius: 2,
        backgroundColor: Colors.blue,
        width: '98%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchb2: {
        borderRadius: 2,
        backgroundColor: Colors.blue,
        width: '98%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerbt: {
        display: 'flex',
        flexDirection: 'row',
    },
    container1bt: {
        alignItems: 'flex-start',
        width: '22%',
        marginLeft: 3,
        justifyContent: 'center',
    },
    container2bt: {
        alignItems: 'flex-start',
        width: '72%',
        justifyContent: 'center',
    },
    container1bt2: {
        width: '25%',
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    container2bt2: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconmenu: {
        color: Colors.white,
    },
    texttouch: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    textlittle: {
        fontSize: 11,
        color: Colors.white,
        marginTop: -3,
    }
});

export default Menu;