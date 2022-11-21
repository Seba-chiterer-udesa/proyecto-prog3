import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
	
	constructor() {
		super();
		this.state = {
			email: '',
			pass: '',
			error:'',
		};
	}

	loginUser(email, pass) {
		
		auth.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.setState({
					email: '',
					pass: '',
				});
				this.props.navigation.navigate('Home');
			})
			.catch((error) => 
			{console.log(error)
			this.setState({error:error.message})
			
		    });
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>Ingresar</Text>
				</View>				

					<TextInput 
					style={styles.field} 
					placeholder="email" 
					keyboardType="email-address" 
					onChangeText={(text) => this.setState({ email: text })} 
					value={this.state.email} />

					<TextInput 
					style={styles.field} 
					placeholder="password" 
					keyboardType="default" 
					secureTextEntry= {true}
					onChangeText={(text) => this.setState({ pass: text })} 
					value={this.state.pass} />

					<Text style={styles.title} onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>
					<Text style={styles.title}>{this.state.error}</Text>
					<Text style={styles.title} onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
				</View>
			
		);
	}
}

const styles = StyleSheet.create({
	
	header:{
		backgroundColor: "#14213D",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},	
	headertitle:{
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container:{
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		color: "#ff9f68",
		paddingTop: 20,
	},
	/* form:{
		backgroundColor: 'red',
	}, */
	field: {
		width: "50%",
		backgroundColor: "#E5E5E5",
		textAlign: "center",
		padding: 7,
		marginTop: 5,
		borderRadius: 15,
	  },
	  title: {
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	  },
});

export default Login;
