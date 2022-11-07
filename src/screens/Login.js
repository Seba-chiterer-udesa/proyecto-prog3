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
		auth
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.setState({
					email: '',
					pass: '',
				});
				this.props.navigation.navigate('HomeMenu');
			})
			.catch((error) => 
			{console.log(error)
			this.setState({error:error.message})
			
		    });
	}

	render() {
		return (
			<View>
				<Text>Ingresar</Text>
				<View>

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
					secureTextEntry 
					onChangeText={(text) => this.setState({ pass: text })} 
					value={this.state.pass} />

					<Text onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>
					<Text>{this.state.error}</Text>
					<Text onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	field: {},
});

export default Login;
