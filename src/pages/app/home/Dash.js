import React, { useState, useEffect } from 'react';
import Colors from '../../../utils/Colors';
import api from '../../../services/api';
import Card from '../../../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Animated
} from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Dash = ({ data, paramnsjob }) => {
    const navigation = useNavigation();
    const [boxes, setBoxes] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [setReceive, receiver] = useState('');

    useEffect(() => {
        async function loadBoxes() {
            const userid = await AsyncStorage.getItem('userid');
            const response = await api.get('/listboxes', {
                token: 'any_string',
                app_origin: 'react',
                type: 'all',
                promoter: userid
            });
            console.log(response.data)
            setBoxes(response.data)
        };
        loadBoxes();
    }, []);

    useEffect(() => {
        return () => {
        };
    }, []);

    async function reloadBoxes() {
        const userid = await AsyncStorage.getItem('userid');
        const response = await api.get('/listboxes', {
            token: 'any_string',
            app_origin: 'react',
            type: 'all',
            promoter: userid
        });
        setBoxes(response.data)

       setTimeout(() => {
            navigation.navigate('Home', {
                page: 'home', job: 'noreload'
            });
        }, 100);
    };


    async function loadBoxes() {
        const userid = await AsyncStorage.getItem('userid');
        const response = await api.get('/listboxes', {
            token: 'any_string',
            app_origin: 'react',
            type: 'all',
            promoter: userid
        });
        setBoxes(response.data)
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        reloadBoxes()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <ScrollView
                    style={styles.scroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {
                        paramnsjob !== undefined && paramnsjob.job === 'reload' ?
                            (
                                <>
                                    {
                                        data !== null && data.map((box, index) => (
                                            <Card data={box} refreshing={refreshing} reloadBoxes={reloadBoxes} key={index} ind={index} />
                                        ))
                                    }
                                </>
                            )
                            :
                            (
                                <>
                                    {
                                        boxes === null ?
                                            (
                                                <>
                                                    <View style={styles.containernone}>
                                                        <Text style={styles.textnone}>Nenhuma caixa foi montada ainda.</Text>
                                                    </View>
                                                </>

                                            )
                                            :
                                            (
                                                <>
                                                    {
                                                        boxes.map((box, index) => (
                                                            <Card data={box} refreshing={refreshing} reloadBoxes={reloadBoxes} key={index} ind={index} />
                                                        ))
                                                    }
                                                </>
                                            )
                                    }
                                </>
                            )

                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        backgroundColor: Colors.lightGray,
        marginTop: 0,
    },
    inner: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 0,
        marginTop: 7,
        padding: 6,
        backgroundColor: Colors.lightGray,
        borderRadius: 5,
    },
    scroll: {
        flex: 7,
        backgroundColor: Colors.white,
        padding: 5,
    },
    containernone: {
        flex: 7,
        backgroundColor: Colors.white,
        marginTop: 10,
        padding: 30,
    },
    textnone: {
        textAlign: 'center',
        fontSize: 17,
    }
});

export default Dash;