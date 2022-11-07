import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Register extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			checkpass:'',
			username: '',
			error:'',
			users:[],
		};
	}

	componentDidMount() {

		db.collection('users').onSnapshot(
			(docs) => {  /* OnSnapshoot obtiene todos los documentos de la colecicon users y los coloca en el parametro docs */
				let users = [];
				docs.forEach(doc => {
					users.push(doc.data());
				});
				this.setState({
					users: users,
				})
			}	
		);
		console.log(this.state.users);
	}

	validateUser() { /*  Fijarme si esta bien esto */
		let users = this.state.users.filter((user) => {
		  return user.username == this.state.username;
		});
		if (users.length > 0) {
		  return true;
		} else {
		  return false;
		}
	  }
	

	register() {
    	if (
		  this.state.pass == "" ||
		  this.state.email == "" ||
		  this.state.username == ""
		) {
		  alert("Completar los campos es obligatorio.");
		} else if (!this.state.email.includes("@")) {
		  alert("El formato de e-mail no es válido.");
		} else if (this.validateUser()) {
		  alert("Este nombre de usuario esta ocupado. Por favor, elija otro.");
		} else if (this.state.pass.length < 6) {
		  alert("La contraseña tiene que tener al menos 6 caracteres.");
		} else if (this.state.pass !== this.state.checkpass) {
		  alert("Escriba la misma contraseña.");
		} else {
		  this.props.HandleRegister(this.state.email, this.state.pass, this.state.username);
		}
	  }

	render() {
		return (
			<View>
				<Text>Registro</Text>
				<View>

					<TextInput 
					
						style={styles.field} 
						placeholder="Email" 
						keyboardType="email-address" 
						onChangeText={(text) => this.setState({ email: text })} 
						value={this.state.email} 
						
					/>
					
					<TextInput
					
						style={styles.field}
						placeholder="Nombre de usuario"
						keyboardType="default"
						onChangeText={(text) => this.setState({ username: text })}
						value={this.state.username}

					/>

					<TextInput 

					style={styles.field} 
					placeholder="Contraseña" 
					keyboardType="default" 
					secureTextEntry = {true}
					onChangeText={(text) => this.setState({ pass: text })} 
					value={this.state.pass} 
					
					/>

					<TextInput 

					style={styles.field} 
					placeholder="Repetir Contraseña" 
					keyboardType="default" 
					secureTextEntry = {true}
					onChangeText={(text) => this.setState({ checkpass: text })} 
					value={this.state.checkpass} 
					
					/>

					<Text onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>
					
					<TouchableOpacity 
					
					onPress={() => this.register()}
					disabled={
						this.state.email == "" ||
						this.state.pass == "" ||
						this.state.username == "" ||
						this.state.checkpass == ""
						  ? true
						  : false
					  }
					>
						<Text>Registrarme</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	field: {},
});

export default Register;
