import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';

import Post from '../components/Post';

class Profile extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			activeUser:{},
			image:'',
			bio:'',
			data: [],
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
		  )

		  db.collection('users').onSnapshot( docs =>{
			docs.forEach(oneDoc => {
				if(auth.currentUser.email === oneDoc.data().email){
					this.setState({
						activeUser: {
							id: oneDoc.id, 
							data: oneDoc.data(),
						}
					})				
				this.setState({
					bio: this.state.activeUser.data.bio,
					image: this.state.activeUser.data.image
				})
				}
			})
		})

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
							<View style={styles.flexbox2}>
								<Image source={{uri: this.state.image}} style={styles.profilePhoto}/>
								<Text style={styles.username}>{auth.currentUser.displayName}</Text>
							</View>
						    
							<TouchableOpacity onPress={() => this.logOut()}>
					  			<Text style={styles.username}>Cerrar Sesión</Text>
							</TouchableOpacity>
				  		</View>
					</View>
					<View style={styles.dataContainer}>
                		<Text style={styles.data}> Publicaciones:{this.state.posts.length} </Text>
                		<Text style={styles.data}> Email: {auth.currentUser.email}</Text>
						<Text style={styles.data}> Biografía: {this.state.biografia}</Text>
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
					  <Text style={styles.newPost} ><strong>Crear tu primer posteo</strong></Text>
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
	  backgroundColor: '#dee2ff',
	},
	data:{
		textAlign: "center",
		color: "black",
		fontWeight: "600",
		fontSize: 15,
		padding: 5,
	  },
	dataContainer:{
		marginTop:10,
	},  
	header: {
	  backgroundColor: 'purple',
	  boxSizing: 'border-box',
	  width: '100%',
	  padding: 15,
	  flexDirection: 'column',
	  justifyContent: 'space-around',
	},
	flexbox: {
	  flexWrap: 'wrap',
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	},
	flexbox2: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
	  },
	title:{
		padding:10,  
		fontSize: 15,
		color: 'black',
	  },
	profilePhoto: {
       height: '30px',
       width: '30px',
       borderRadius: 50
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
	newPost:{
		color:'white'
	},
	addPost:{
	  backgroundColor: 'purple',
	  textAlign: 'center',
	  color: 'white',
	  padding: 10,
	  marginTop: 5,
	  borderRadius: 5,
	  width: '50%',
	},
	textNoPost: {
	  color:'black',
	  textAlign: 'center',
	  margin: 30,
	},
	username: {
	  textAlign: 'left',
	  color: 'white',
	  fontWeight: '600',
	  fontSize: 15,
	  marginLeft:10,
	  marginTop:3,
	},
  });

export default Profile;
 