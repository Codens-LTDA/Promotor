import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../pages/app/home';
import Processbox from '../pages/app/processbox';
import Processrequests from '../pages/app/processrequest';
import Requestsinbox from '../pages/app/requestsinbox';
import Returnbox from '../pages/app/processreturn';
import Processtext from '../pages/app/processtext';
import Colect from '../pages/app/consultcollect';

const App = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Processbox"
				component={Processbox}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Processrequest"
				component={Processrequests}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Requestsinbox"
				component={Requestsinbox}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Returnbox"
				component={Returnbox}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Colect"
				component={Colect}
				options={{ headerShown: false }}
			/>			
		</Stack.Navigator>
	);
};

export default App;