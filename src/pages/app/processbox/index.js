import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Scanner from '../../../components/Scanner';
import api from '../../../services/api';
import { ProcessContext } from '../../../context';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native';

const Process = ({ route, navigation }) => {
    const [showScanner, setShowScanner] = useState(true);
    const [idbox, setIdbox] = useState('-');
    const [qrbox, setQrbox] = useState('-');
    const isFocused = useIsFocused();


    const processContext = React.useMemo(() => {
        return {
            readBox,
            idbox,
            qrbox,
        };
    });

    const { page } = route.params

    async function readBox(box) {
        const response = await api.get('/readbox', {
            token: 'any_string',
            box: box,
        }).then((res) => {

            setIdbox(box);
            setQrbox(res.data.id)

            showMessage({
                message: "Caixa inserida com sucesso!",
                type: "success",
            });

            setTimeout(() => {
                navigation.navigate('Processrequest', {
                    page: 'readrequest', idbox: res.data.id, qrbox: box
                });
            }, 500);
        }).catch((err) => {
            showMessage({
                message: `${err.data.status}`,
                type: "danger",
            });
        });        
    };

    return (
        <ProcessContext.Provider value={processContext}>
            { isFocused &&  <Scanner page={page} handle={readBox} setShowScanner={setShowScanner}/>  }
        </ProcessContext.Provider>
    )
}

export default Process;