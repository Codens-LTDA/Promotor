import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { ConsultContext } from '../../../context';
import Header from '../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './menu';
import CardCollect from '../../../components/CardCollect';
import Colors from '../../../utils/Colors';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated
} from 'react-native';

const Colect = ({ route, navigation }) => {
  const [data, setData] = React.useState('');
  const [collects, setCollects] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const consultContext = React.useMemo(() => {
    return {
      ste_data: data,
    };
  });


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });

    async function getCollect(number) {
      const userid = await AsyncStorage.getItem('userid'); 
      const response = await api.post('/colect', {
          token: 'any_string',
          app_origin: 'react',
          promotor: userid,  
        }).then((res) => {
          console.log(res.data)
          setCollects(res.data)
        }).catch((err) => {
          console.log(err)
        });
      }
      getCollect();

      return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reloadCollect()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  async function reloadCollect() {
    const userid = await AsyncStorage.getItem('userid'); 
    const response = await api.post('/colect', {
        token: 'any_string',
        app_origin: 'react',
        promotor: userid,  
      }).then((res) => {
        setCollects(res.data)
      }).catch((err) => {
        console.log(err)
      });
};


  return (
    <ConsultContext.Provider value={consultContext}>
      <Header />
      <>

                <View style={styles.container}>
                  <View style={styles.inner}>
                      <View style={styles.viewtittle}>
                        <Text style={styles.title}>Coletas</Text>
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
                        {
                          collects.map((collect, index) => (
                            <CardCollect data={collect}  key={index} refreshing={refreshing} reloadCollect={reloadCollect} key={index} ind={index} />
                          ))
                        }
                        </ScrollView>
                  </View>
                </View>
      </>      
      <Menu navigation={navigation} />      
    </ConsultContext.Provider>
  )
};

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
  viewtittle: {
    height: 50,
    flexDirection: 'row',    
  },
  title:{
    width: '100%',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,    
  }
});

export default Colect;