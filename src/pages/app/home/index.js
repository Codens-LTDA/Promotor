import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { HomeContext } from '../../../context';
import Header from '../../../components/Header';
import Menu from './menu';
import Dash from './Dash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = React.useState('');
  const [boxes, setBoxes] = useState([]);

  const fetch = async () => {
    try {
      await api.get('/solicitacoes_count').then(response => {
        setData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    async function loadBoxes() {
      const userid = await AsyncStorage.getItem('userid');
      const response = await api.get('/listboxes', {
        token: 'any_string',
        app_origin: 'react',
        type: 'all',
        promoter: userid,
      });
      setBoxes(response.data)
    };
    loadBoxes();

    return unsubscribe;
  }, [data, navigation]);

  useEffect(() => {
    return () => {
    };
  }, []);

  const homeContext = React.useMemo(() => {
    return {
      ste_data: data,
    };
  });

  return (
    <HomeContext.Provider value={homeContext}>
      <Header />
      <Dash data={boxes} paramnsjob={route.params} />
      <Menu navigation={navigation} />
    </HomeContext.Provider>
  )
};

export default HomeScreen;