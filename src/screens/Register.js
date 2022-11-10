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
			bio:'',
			error:'',
		};
	}

	componentDidMount() {
		
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.navigate('HomeMenu');
			}
			
			
		});
		
		
	}
	//Al registrar un user, queremos guardarlo en la db con nombre,biografia.

	registerUser(email, pass, username, bio, checkpass) {
		//Chequear si estan vacios los campos
		//Si estan vacios, seteame el estado error a un mesaje
		//Despues pones return
		if(this.state.email === ''  || this.state.username === '' || this.state.pass === ''){
			this.setState({error: 'Todos los campos son obligatorios'})
			return
		}
		if(this.state.pass !== this.state.checkpass){
			this.setState({error: 'Las contraseñas no coinciden'})
			return
		}
		
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					.collection('users')
					.add({
						email: this.state.email,
						username: this.state.username,
						bio: this.state.bio,
						checkpass: this.state.checkpass,
					})
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
							bio: '',
							checkpass:'',
						});
						this.props.navigation.navigate('Login');
					});
					
			})
			.catch((error) => 
			{console.log(error)
			console.log(error.message)
			this.setState({error: error.message})

			})

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>Registro</Text>
				</View>

					<TextInput 
					style={styles.field} 
					placeholder="email" 
					keyboardType="email-address" 
					onChangeText={(text) => this.setState({ email: text })} 
					value={this.state.email} />

					<TextInput
						style={styles.field}
						placeholder="Nombre de usuario"
						keyboardType="default"
						onChangeText={(text) => this.setState({ username: text })}
						value={this.state.username}	/>

					<TextInput 
					style={styles.field} 
					placeholder="Contraseña" 
					keyboardType="default" 
					secureTextEntry 
					onChangeText={(text) => this.setState({ pass: text })} 
					value={this.state.pass} />

					<TextInput 
					style={styles.field} 
					placeholder="Repetir Contraseña" 
					keyboardType="default" 
					secureTextEntry 
					onChangeText={(text) => this.setState({ checkpass: text })} 
					value={this.state.checkpass} />

					<TextInput
					style={styles.field}
					placeholder="Biografia"
					keyboardType="default"
					onChangeText={(text) => this.setState({ bio: text })}
					value={this.state.bio}	/>

					<Text style={styles.title} onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>
					<TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.username, this.state.bio)}>
						<Text style={styles.title}>Registrarme</Text>
					</TouchableOpacity>

					<Text style={styles.title}>{this.state.error}</Text>
				
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

export default Register;

