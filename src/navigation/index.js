import React, { useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context';
import { Text } from 'react-native';

import AuthStack from './auth';
import AppStack from './app';
import Splash from '../pages/auth/Splash';

const Navigation = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	const authContext = React.useMemo(() => {
		return {
			signIn: async () => {
				setIsLoading(false);
				getToken();
			},

			signOut: async () => {
				try {
					await AsyncStorage.setItem('token', '');
				} catch (e) {
					console.log(e);
				}
				setIsLoading(false);
				setUserToken(null);
			},
		};
	}, []);

	const getToken = async () => {
		const token = await AsyncStorage.getItem('token');
		setUserToken(token);
	};
	getToken();
	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return <Splash />;
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{userToken ? <AppStack /> : <AuthStack />}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default Navigation;