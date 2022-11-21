import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
			likesAmount: this.props.dataPost.data.likes.length,
			myLike: false,
		};
	}

	componentDidMount() {
		if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				myLike: true,
			});
		}
	}

	delete(id) {
        db.collection('posts').doc(id).delete()
    }

	like() {
		db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					likesAmount: this.state.likesAmount + 1,
					myLike: true,
				})
			)
			.catch((error) => console.log(error));
	}

	unLike() {
        db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					likesAmount: this.state.likesAmount - 1,
					myLike: false,
				})
			)
			.catch((error) => console.log(error));
    }

	render() {
		return (
			<>
				
				{this.props.dataPost.data.ownerPhoto ?
                        <Image source={{uri: this.props.dataPost.data.ownerPhoto}} style={styles.fotoPerfil}/> /* Imagen del perfil del usuario */
                    :
                        <FontAwesome name="user-circle" size={40} color="black" />
                }
				
				
				<Text>Creado por: {this.props.dataPost.data.owner}</Text> {/* Nombre de Usuario */}

				<Image
                    style={styles.image}
                    source={{ uri: this.props.dataPost.data.url }}
                />
				
				<Text>Texto del Post: {this.props.dataPost.data.description}</Text> {/* Descripcion del posteo */}
				
				<Text>Likes: {this.state.likesAmount} </Text> {/* Cantidad de likes */}

				{this.state.myLike ? 
					<TouchableOpacity onPress={() => this.unLike()}>
						<Text>Quitar Like</Text>
					</TouchableOpacity>
				 : 
					<TouchableOpacity onPress={() => this.like()}>
						<Text>Like</Text>
					</TouchableOpacity>
				} {/* Nos lleva a la pantalla de omentarios */}

				<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id: this.props.dataPost.id})}>
						<Text>Comentarios</Text>
				</TouchableOpacity>

				{
                    this.props.dataPost.data.owner === auth.currentUser.email ? 
                     <TouchableOpacity onPress={() => this.delete(this.props.dataPost.id)}>
                        <Ionicons name="trash" size="20px" color="red" style={styles.trash} />
                    </TouchableOpacity>
                      : 
                      null 
                }

			</>
		);
	}
}

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
	},
	fotoPerfil: {
        height: "25px",
        width: "25px",
        borderRadius: 50
    },
	trash: {
        marginBottom: "12px"
    },
	image: {
		width: "100%",
		height: 200,
		borderRadius: 12,
	  },
});

export default Post;
