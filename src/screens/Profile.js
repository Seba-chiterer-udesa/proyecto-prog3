import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

import Post from '../components/Post';

class Profile extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}
	
	componentDidMount() {
		db.collection('posts')
		  .where( 'owner' , '==' , auth.currentUser.email)
		  .orderBy('createdAt' , 'desc')
		  .onSnapshot(docs => {
			  let posts = [];
			  docs.forEach( oneDoc => {
				posts.push({
				  id: oneDoc.id,
				  data: oneDoc.data(),
				})
			  })
			  this.setState({
				posts: posts,
			  })
			} 
		  ); 
	  } 

	logOut() {
		auth.signOut();
		this.props.navigation.navigate('Login');
	}

	addPost() {
		this.props.navigation.navigate('NewPost');
	  }
	
	  render() {
		return (

			  <View style={styles.container}>
					<View style={styles.header}>
				  		<View style={styles.flexbox}>
							<Text style={styles.username}>{auth.currentUser.displayName}</Text>
							<TouchableOpacity onPress={() => this.logOut()}>
					  			<Text style={styles.username}>Cerrar Sesión</Text>
							</TouchableOpacity>
				  		</View>
					</View>
					<View>
                    	<Text style={styles.title}>Publicaciones de {auth.currentUser.displayName}</Text>
                	</View>

				{this.state.posts.length > 0 ? 
				 
				 <FlatList
					style={styles.posts}
					data={this.state.posts}
					keyExtractor={ post => post.id.toString()}
					renderItem = {({item}) => <Post dataPost = {item}{...this.props} />}
				 />

				 : 

				  <View style={styles.noPost}>
					<Text style={styles.textNoPost}><strong>No tenes publicaciones</strong></Text>
					<TouchableOpacity
					  style={styles.addPost}
					  onPress={() => this.addPost()}>
					  <Text><strong>¡Crear tu primer posteo!</strong></Text>
					</TouchableOpacity>
				  </View>
				}

			  </View>

		);
	  }
}

const styles = StyleSheet.create({

	container: {
	  overflow: 'hidden', /* El overflow hidden es para ocultar el flujo que sobresale de un contenedor */
	  flex: 1,
	  flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#2C2A2A',
	},
	header: {
	  backgroundColor: '#A2A2A2',
	  boxSizing: 'border-box',
	  width: '100%',
	  padding: 10,
	  flexDirection: 'column',
	  justifyContent: 'space-around',
	},
	flexbox: {
	  flexWrap: 'wrap',
	  flexDirection: 'row',
	  /* margin: 6, */
	  justifyContent: 'space-between',
	},
	title:{
		padding:10,  
		fontSize: 15,
		color: 'white',
	  },
	posts: {
	  overflow: 'hidden',
	  width: '100%',
	  flex: 9,
	  flexDirection: 'column',
	},
	noPost: {
	  overflow: 'hidden',
	  width: '100%',
	  flex: 1,
	  flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	addPost:{
	  backgroundColor: '#A2A2A2',
	  textAlign: 'center',
	  padding: 10,
	  marginTop: 5,
	  borderRadius: 5,
	  width: '50%',
	},
	textNoPost: {
	  color:'white',
	  textAlign: 'center',
	  margin: 30,
	},
	username: {
	  textAlign: 'left',
	  color: '#000000',
	  fontWeight: '600',
	  fontSize: 15,
	},
  });

export default Profile;
 