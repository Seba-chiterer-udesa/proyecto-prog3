import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
			likesAmount: this.props.dataPost.data.likes.length,
			myLike: false,
			/* users: [], */
		};
	}

	componentDidMount() {
		if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				myLike: true,
			});
		}

		/* db.collection("users")
		.onSnapshot((users) => {
                let users =[]
                users.forEach(oneUser => {
                    users.push({
                        id: oneUser.id,
                        data: oneUser.data()
                    })
                }) 
                this.setState({
                    users: users
                })
            }) */
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
			<View style={styles.container}>
                
				<View style={styles.content}>
				    {this.props.dataPost.data.ownerPhoto ?
                        <Image source={{uri: this.props.dataPost.data.ownerPhoto}} style={styles.profilePhoto}/>
                    	:
                        <FontAwesome name="user-circle" size={40} color="black" />
                    }
                    <Text style={styles.username}>
                            {this.props.dataPost.data.owner}
                    </Text>
                </View> 

                <Image
                    style={styles.image}
                    source={{ uri: this.props.dataPost.data.url }}
                />

                <View style={styles.content}>
                    <View style={styles.content2}>
                            <Text style={styles.likes}>
                                Descripción: {this.props.dataPost.data.description}
                            </Text>
                    </View>
					<View style={styles.content2}>
						{ this.state.myLike ? 
                        	<TouchableOpacity onPress={() => this.unLike()}>
                        	    <Ionicons
                           			 style={styles.heart}
                            		 name="heart"
                            		 size="20px"
                            		 color="red"
                            	/>
                        	</TouchableOpacity>
                        	: 
                       		<TouchableOpacity onPress={() => this.like()}>
                        	    <Ionicons
                            		style={styles.heart}
                            		name="heart-outline"
                            		size="20px"
                            		color="black"
                            />
                        	</TouchableOpacity>
                        }
					</View>
                    <View style={styles.content2}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {id: this.props.dataPost.id})}> 
                            <Text style={styles.likes}>Comentarios: {this.props.dataPost.data.comments.length}</Text>
                            </TouchableOpacity>
                    </View>
					<View style={styles.content2}>
							<Text style={styles.likes}>Likes: {this.state.likesAmount}</Text>
					</View>
					<View style={styles.content2}>
						{
                        	this.props.dataPost.data.owner == auth.currentUser.email ? 
                        	<TouchableOpacity onPress={() => this.delete(this.props.dataPost.id)}>
                            	<Ionicons name='trash' size='20px' style={styles.trash} />
                        	</TouchableOpacity>
                         	: 
                            null 
                         }
					</View>	
                </View>   
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		width: '90%',
		padding: 5,
		margin: 'auto',
		marginBottom: 15,
		borderStyle:'solid',
		borderWidth:2,
		borderRadius:5,
		borderColor:'#FFFFFF',
		backgroundColor: '#FFFFFF',
	},
	profilePhoto: {
        height: '25px',
        width: '25px',
        borderRadius: 50
    },
    image: {
      width: '100%',
      height: 300,
    },
    content: {
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
    },
    content2: {
	  width:'100%',
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    text: {
      color: 'black',
      textAlign: 'center',
      padding: 5,
    },
    username: {
      color: 'black',
      fontWeight: '600',
      fontSize: 15,
      padding: 5,
      paddingBottom: '12px'
    },
    trash: {
        /* marginBottom: '8px', */
		color: 'black',
		padding: 5,
    },
    postOwner: {
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',
        fontSize: 15,
        padding: 5,
      },
    likes: {
    	textAlign: 'left',
    	color: 'black',
    	fontWeight: '500',
    	fontSize: 15,
    	padding: 5,
    },
	heart: {
		marginLeft: 10,
	},
  }); 

export default Post;
