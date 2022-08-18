import React from 'react';
import Colors from '../../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBox, faBoxOpen, faHome } from '@fortawesome/free-solid-svg-icons'

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

const Menu = ({ navigation }) => {
	const Readbox = () => {
		navigation.navigate('Processbox', {
			page: 'readbox'
		});
	}

	const Returnbox = () => {
		navigation.navigate('Returnbox', {
			page: 'returnbox'
		});
	}

	const Home = () => {
		navigation.navigate('Home', {
			page: 'home'
		});
	}	
	
	return (
		<View style={styles.container}>
			<View style={styles.boxbottom1}>
				<TouchableOpacity style={styles.touchb1} onPress={Readbox}>
					<View style={styles.containerbt}>
						<View style={styles.container1bt}>
							<FontAwesomeIcon icon={faBoxOpen} style={styles.iconmenu} size={32} />
						</View>
						<View style={styles.container2bt}>
							<Text style={styles.texttouch}>Montar</Text>
							<Text style={styles.textlittle}>Leia a caixa</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.boxbottom2}>
				<TouchableOpacity style={styles.touchb2}  onPress={Returnbox}>
					<View style={styles.containerbt}>
						<View style={styles.container1bt2}>
							<FontAwesomeIcon icon={faBox} style={styles.iconmenu} size={25} />
						</View>
						<View style={styles.container2bt2}>
							<Text style={styles.texttouch}>Devolver</Text>
							<Text style={styles.textlittle}>Leia a caixa</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.boxbottom3}>
				<TouchableOpacity style={styles.touchb2}  onPress={Home}>
					<View style={styles.containerbt}>
						<View style={styles.container1bt2}>
							<FontAwesomeIcon icon={faHome} style={styles.iconmenu} size={26} />
						</View>
						<View style={styles.container2bt2}>
							<Text style={styles.texttouch}>Home</Text>
							<Text style={styles.textlittle}></Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>			
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: Colors.white,
		padding: 6,
		marginLeft: 6,
		marginRight: 6,
	},
	boxbottom1: {
		width: '33%',
	},
	boxbottom2: {
		width: '33%',
		alignItems: 'flex-end',
	},
	boxbottom3: {
		width: '34%',
		alignItems: 'flex-end',
	},
	touchb1: {
		borderRadius: 2,
		backgroundColor: Colors.blue,
		width: '98%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	touchb2: {
		borderRadius: 2,
		backgroundColor: Colors.blue,
		width: '98%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerbt: {
		display: 'flex',
		flexDirection: 'row',
	},
	container1bt: {
		alignItems: 'flex-start',
		width: '27%',
		marginLeft: 25,
		justifyContent: 'center',
	},
	container2bt: {
		alignItems: 'flex-start',
		width: '70%',
		justifyContent: 'center',
	},
	container1bt2: {
		width: '20%',
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	container2bt2: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	iconmenu: {
		color: Colors.white,
	},
	texttouch: {
		color: Colors.white,
		fontWeight: 'bold',
		fontSize: 16,
		marginLeft: 5,
	},
	textlittle: {
		fontSize: 11,
		color: Colors.white,
		marginTop: -5,
		marginLeft: 5,		
	}
});

export default Menu;