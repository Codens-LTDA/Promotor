import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import Color from '../utils/Colors';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBox, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { showMessage, hideMessage } from "react-native-flash-message";

const Cardrequests = ({ data, refreshing, index }) => {
    const [requests, setRequest] = useState([]);

    async function checkRequest(request, number){
        var check;

        if (request === true){
            check = 1;
        }else{
            check = 0;
        }

        const response = await api.post('/checkrequests', {
            token: 'any_string',
            app_origin: 'react',
            number: number,
            check: check,
        }).then((res) => {
            if (request === true){
                showMessage({
                    message: "Marcada para complemento em outra caixa",
                    type: "success",
                });
            }else{
                showMessage({
                    message: "Desmarcada",
                    type: "info",
                });            
            }

        }).catch((err) => {
            showMessage({
                message: `Não foi possível checar esta solicitação`,
                type: "danger",
            });
        });
    }

    return (
        <View key={index} style={styles.containerrequest}>
            <View style={styles.requestnumber}>
                <Text style={styles.number}>{data.ses_numero}</Text>
            </View>
            <View style={styles.requestclient}>
                <Text style={styles.client}>{data.cli_nome}</Text>
            </View>
            <View style={styles.containeraditional}>
                <Text style={styles.aditionalboxtext}>Caixa adicional</Text>
                <BouncyCheckbox
                size={30}
                fillColor={Color.blue}
                unfillColor="#FFFFFF"
                style={styles.checkbox}
                iconStyle={{ borderColor: Color.blue, borderWidth: 3 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={(isChecked: boolean) => {checkRequest(isChecked, data.ses_numero)}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerbox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.blue,
        padding: 7,
        marginBottom: 10,
        borderRadius: 4,
    },
    containerboxopen: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.blue,
        padding: 7,
        marginBottom: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cnticon: {
        backgroundColor: Color.white,
        padding: 10,
        borderRadius: 100,
    },
    icon: {
        color: Color.blue,
    },
    cnticonopen: {
        backgroundColor: Color.white,
        padding: 6,
        borderRadius: 100,
    },
    title: {
        color: Color.white,
        fontSize: 22,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    containerrequests: {
        backgroundColor: Color.white,
        marginTop: -10,
        padding: 3,
        marginBottom: 8,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    containerrequest: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        padding: 5,
        borderRadius: 2,
    },
    requestnumber: {
        width: 55,
        height: 55,
        borderRadius: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Color.blue,
    },
    number: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Color.black,
    },
    requestclient: {
        alignItems: 'flex-start',
        width: 200,
        marginTop: 10,
        marginLeft: 10,
    },
    client: {
        fontWeight: 'bold',
        fontSize: 19,
        color: Color.black,
    },
    aditionalboxtext: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 2,
    },
    containeraditional: {
        width: 99,
    },
    checkbox: {
        justifyContent: 'center',
    }
});

export default Cardrequests;