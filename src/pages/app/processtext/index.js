import React, {} from 'react';
import {} from 'react-native';
import Scanner2 from '../../../components/Scanner2';
import api from '../../../services/api';
import { ProcessContext } from '../../../context';
import { showMessage, hideMessage } from "react-native-flash-message";

const Processrequest = ({ route, navigation }) => {
    const [showScanner, setShowScanner] = React.useState(false);
    const { page, idbox, qrbox } = route.params

    const processContext = React.useMemo(() => {
        return {
            readRequest
        };
    });
    async function readRequest(number) {
        const response = await api.post('/readsolicitation', {
            token: 'any_string',
            app_origin: 'react',
            box: qrbox,
            idbox: idbox,
            number: number

        }).then((res) => {
            showMessage({
                message: "Solicitação inserida com sucesso!",
                type: "success",
            });

            setTimeout(() => {
                navigation.navigate('Requestsinbox', {
                    data: res.data, box: qrbox, idbox: idbox
                });
            }, 500);

        }).catch((err) => {
            showMessage({
                message: `${err.data.status}`,
                type: "danger",
            });
            console.log(err.data.status)            
        });

        setTimeout(() => {
            setShowScanner(false);
        }, 3000);
    }

    return (
        <ProcessContext.Provider value={processContext}>
            <Scanner2 page={page} handle={readRequest} setShowScanner={setShowScanner} showScanner={showScanner} qrbox={qrbox} idbox={idbox}/>
        </ProcessContext.Provider>
    )
}

export default Processrequest;