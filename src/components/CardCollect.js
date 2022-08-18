import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    TextInput
} from 'react-native';
import Color from '../utils/Colors';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTruck, faBoxOpen, faCalendar, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons'
import Colors from '../utils/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from 'react-native-modal';
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';

const CardCollect = ({ data, refreshing, reloadCollect, ind }) => {
    const [requests, setRequest] = useState([]);
    const [openbox, setOpenbox] = useState(false);
    const [receiver, setReceive] = useState('');
    const [modalreceiver, setModalreceiver] = React.useState(false);

    const swipeableRef = useRef(null);

    useEffect(() => {
        async function loadBoxes() {
            try {
                const response = await api.get('/listsolicitations', {
                    token: 'any_string',
                    app_origin: 'react',
                    idbox: data.cc_idcontainer,
                });
                setRequest(response.data)
            } catch (err) {
                console.log(err);
                if (err.status == 401) {
                    alert('Alguma coisa está errada');
                }
            }
        };

        const closeBoxes = () => {
            if (refreshing === true) {
                setOpenbox(false);
            }
        }

        closeBoxes()
        loadBoxes();
    }, [refreshing]);

    const clickOut = () => {
        setOpenbox(!openbox);
    }

    async function collected () {
        const response = await api.post('/colected', {
            token: 'any_string',
            app_origin: 'react',
            id: data.col_id
        }).then((res) => {
            console.log(res.data)
            showMessage({
                message: "Coletado com sucesso",
                type: "success",
            });
            setTimeout(() => {
                reloadCollect()
            }, 40);

            swipeableRef.current.close();

        }).catch((err) => {
            showMessage({
                message: `Algo está errado`,
                type: "danger",
            });
        });        
    }

    const handleLeft = (ind) => {
        collected();        
    }



    const showClient = () => {
        return (
            <>
            {/*
                <View style={styles.containerclinetshow}>
                    <Text style={styles.titleclshow}>Clientes da caixa</Text>
                    {
                        data.clientes.map((client, index) => (
                            <Text style={styles.clientshow} key={index}>{client.nome}</Text>
                        ))
                    }
                </View>*/
                }
            </>
        );
    }

    async function backList() {
        setOpenbox(false);
        setReceive('')
        setModalreceiver(false)

        swipeableRef.current.close();
    }

    async function deliveryBox() {
        console.log('asdasda')
        const response = await api.post('/deliverybox', {
            token: 'any_string',
            app_origin: 'react',
            idbox: data.cc_idcontainer,
            receiver: receiver,  

        }).then((res) => {
            console.log(res)
            showMessage({
                message: "Caixa entregue com sucesso",
                type: "success",
            });
            setOpenbox(false);
            setReceive('')
            setModalreceiver(false)

            setTimeout(() => {
                reloadCollect()
            }, 100);


            swipeableRef.current.close();

        }).catch((err) => {
            showMessage({
                message: `Algo está errado`,
                type: "danger",
            });
        });
    }

    function LeftActions(progress, dragX) {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <View style={styles.leftAction}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Coletar</Animated.Text>
                <FontAwesomeIcon icon={faCheckCircle} size={25} style={styles.icondelivery} />
            </View>
        );
        
    }

    return (
        <View>
            <Modal isVisible={modalreceiver}>
                <View style={styles.modal}>
                    <Text style={styles.input}>Insira o nome de quem recebeu</Text>
                    <TextInput style={styles.inputpromoter}
                        onChangeText={event => setReceive(event)}
                        value={receiver}
                        placeholder="Recebedor" />
                    <View style={styles.divbottons}>
                        <TouchableOpacity style={styles.deliverybt} onPress={deliveryBox}>
                            <View style={styles.containerbottom}>
                                <Text style={styles.textdelivery}>Entregar caixa</Text>
                                <FontAwesomeIcon icon={faCheckCircle} size={25} style={styles.icondelivery} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deliverybt} onPress={backList}>
                            <View style={styles.containerbottom}>
                                <Text style={styles.textdelivery}>Voltar</Text>
                                <FontAwesomeIcon icon={faUndo} size={25} style={styles.icondelivery} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Swipeable
                renderLeftActions={LeftActions}
                onSwipeableLeftOpen={event => handleLeft(ind)}
                ref={swipeableRef}
            >
                <TouchableOpacity style={openbox ? styles.containerboxopen : styles.containerbox} onPress={clickOut}>
                    <View style={styles.containerboxleft}>
                        <View style={openbox ? styles.cnticonopen : styles.cnticon}>
                            <FontAwesomeIcon icon={faTruck} size={30} style={styles.icon} />
                        </View>
                    </View>
                    <View style={styles.containerboxright}>
                        <View style={styles.cnttitle}>
                            <Text style={styles.title}>{data.cli_nome}</Text>
                        </View>              
                        <View style={styles.cnttitle2}>
                            <FontAwesomeIcon icon={faCalendar} size={20} style={styles.icon2} />
                            <Text style={styles.cntqrcode}>{moment(data.col_data).format("DD/MM/YYYY")}</Text>
                        </View>                                      
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </View>
    )
}

const styles = StyleSheet.create({
    containerbox: {
        backgroundColor: Color.blue,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 7,
        marginBottom: 10,
        borderRadius: 4,        
    },
    containerboxopen: {
        backgroundColor: Color.blue,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 7,
        marginBottom: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,    
    },
    cnttitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
		alignItems: 'center',
    },
    cnttitle2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
		alignItems: 'center',
        marginLeft: 20,
        marginTop: -3,
    },    
    icon: {
        color: Color.blue,
    },
    icon2: {
        color: Color.white,        
    },
    title: {
        color: Color.white,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    cnticon: {
        backgroundColor: Color.white,
        padding: 10,
        borderRadius: 100,
        width: 52,
        justifyContent: 'center',
    },    
    cnticonopen: {
        backgroundColor: Color.white,
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
    },
    cntqrcode: {
        color: Color.white,
        marginLeft: 5,
        fontSize: 16,
    },
    cntqrcode2: {
        color: Color.white,
        marginLeft: 10,
        fontSize: 16,
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
    containerboxright: {
        alignItems: 'flex-start',
        width: 230,
        marginTop: 10,
        marginLeft: 10,        
    },
    requestnumber: {
        width: 65,
        height: 65,
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
        width: 250,
        marginTop: 10,
        marginLeft: 10,
    },
    client: {
        fontWeight: 'bold',
        fontSize: 19,
        color: Color.black,
    },
    leftAction: {
        backgroundColor: '#388e3c',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        marginBottom: 10,
        borderRadius: 4,
    },
    actionText: {
        color: Colors.white,
        fontSize: 22,
    },
    icondelivery: {
        color: Color.white,
        marginLeft: 5,
    },
    modal: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 3,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputpromoter: {
        borderColor: Color.grey,
        borderWidth: 1,
        width: '100%',
        padding: 10,
        borderRadius: 2,
    },
    deliverybt: {
        marginTop: 20,
        backgroundColor: Color.blue,
        width: '52%',
        height: 40,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    textdelivery: {
        textAlign: 'center',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Color.white,
    },
    input: {
        textAlign: 'center',
        fontSize: 17,
        color: Color.black,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    containerbottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -3,
    },
    cnttitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
		alignItems: 'center',
    },
    cntqrcode: {
        color: Color.white,
        marginLeft: 10,
        fontSize: 16,
    },
    divbottons: {
        display: 'flex',
        flexDirection: 'row',
        padding: 6,
        marginLeft: 6,
        marginRight: 6,
    },
    clientshow: {
        fontSize: 9,
        color: Color.white,
        marginTop: -1,

    },
    containerclinetshow: {
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 20,
        padding:4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 3,
    },
    titleclshow: {
        color: Color.white,
        marginTop: -5,
        marginBottom:1,
        fontSize: 9,
        fontWeight: 'bold',
    }
});

export default CardCollect;