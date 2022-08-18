import React, { useEffect, useState, useMemo } from 'react';
import {
    View, Text, StyleSheet, ScrollView, RefreshControl
} from 'react-native';
import Colors from '../../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFile, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import api from '../../../services/api';
import Cardrequest from '../../../components/Cardrequests';
import Menu from './menu';
import { ProcessContext } from '../../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Requestsinbox = ({ route, navigation }) => {
    const { data, box, idbox } = route.params
    const [requests, setRequests] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [userid, setUserid] = useState('');

    const processContext = React.useMemo(() => {
        return {
        };
    });

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        reloadBoxes()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        const loadName = async () => {
            const userid = await AsyncStorage.getItem('userid');
            setUserid(userid);
        };
        loadName();

        async function listRequets() {
            const response = await api.get('/listsolicitations', {
                token: 'any_string',
                app_origin: 'react',
                idbox: idbox,
            }).then((res) => {
                setRequests(res.data);
            }).catch((err) => {
                console.log(err)
            });
        }

        listRequets();
    });

    async function reloadBoxes() {
        const response = await api.get('/listsolicitations', {
            token: 'any_string',
            app_origin: 'react',
            idbox: idbox,
        }).then((res) => {
            console.log(res.data)
            setRequests(res.data);
        }).catch((err) => {
            console.log(err)
        });
    }


    return (
        <ProcessContext.Provider value={processContext}>
            <View style={styles.container}>
                <View style={styles.inner}>
                    <View style={styles.containerboxlistsol}>
                        <View style={styles.boxbox}>
                            <FontAwesomeIcon icon={faBoxOpen} size={30} style={styles.icon} />
                        </View>
                        <Text style={styles.boxtext}>CAIXA </Text>
                        <Text style={styles.qrcodebox}>{box}</Text>
                    </View>
                    <ScrollView
                        style={styles.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={styles.containerlistsol}>
                            <Text style={styles.title}>Solicitações inseridas na caixa até o momento.</Text>
                            <View style={styles.listarequests}>
                                {
                                    requests.map((request, index) => (
                                        <Cardrequest data={request} refreshing={refreshing} key={index} />
                                    ))
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Menu qrbox={box} idbox={idbox} navigation={navigation} userid={userid}/>
        </ProcessContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    containerboxlistsol: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        padding: 10,
        backgroundColor: Colors.blue,
    },
    boxtext: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        color: Colors.blue,
    },
    qrcodebox: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 1,
    },
    boxbox: {
        backgroundColor: Colors.white,
        borderRadius: 100,
        padding: 7,
    },
    containerlistsol: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.lightGray,
    },
    listarequests: {
        padding: 6,
    }
});

export default Requestsinbox;