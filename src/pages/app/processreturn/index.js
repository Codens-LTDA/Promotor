import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Scanner from '../../../components/Scanner';
import api from '../../../services/api';
import { ProcessContext } from '../../../context';
import { showMessage, hideMessage } from "react-native-flash-message";
import { RotationGestureHandler } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const Processreturn = ({ route, navigation }) => {
    const [showScanner, setShowScanner] = React.useState(false);
    const { page } = route.params
    const isFocused = useIsFocused();

    const processContext = React.useMemo(() => {
        return {
            returnBox
        };
    });
    async function returnBox(qrcode) {
        const response = await api.post('/devolutionbox', {
            token: 'any_string',
            app_origin: 'react',
            qrcode: qrcode,

        }).then((res) => {
            showMessage({
                message: "Caixa devolvida com sucesso",
                type: "success",
            });

            setTimeout(() => {
                navigation.navigate('Home', {
                });
            }, 500);

        }).catch((err) => {
            showMessage({
                message: `${err.data.status}`,
                type: "danger",
            });
            console.log(err.data.status)
        });
    }

    console.log('asdasd')


    return (
        <ProcessContext.Provider value={processContext}>
            { isFocused && <Scanner page={page} handle={returnBox} setShowScanner={setShowScanner} showScanner={showScanner} />}
        </ProcessContext.Provider>
    )
}

export default Processreturn;