import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

import Post from '../components/Post';

class Home extends Component {
	
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )

        
    }


    render(){
        
        return(
                <View style= {styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.username}>Bienvenido {auth.currentUser.displayName}</Text>
                    </View>
                   
                    <View>
                        <Text style={styles.title}>Publicaciones</Text>
                    </View>
                    
                    <FlatList 
                        style={styles.posts}
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item}{...this.props} />}// los tres puntos ... se llaman spread operator
                         /* usamos ...this.props porque tenemos que pasar el objeto de navegacion, nevigation y route */
                    />
                </View>

        )
    }
}

const styles = StyleSheet.create({
    
    container: {
      overflow: 'hidden',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#dee2ff',
      color: '#ff9f68',
    },
    title:{
      padding:10,  
      color:'black',
      fontSize: 15,
    },
    header: {
      backgroundColor: 'purple',
      width: '100%',
      padding: 15,
      oxSizing: 'border-box',
    },
    posts: {
      overflow: 'hidden',
      width: '100%',
      flex: 9,
      flexDirection: 'column',
    },
    username: {
      color: 'white',
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '600',
      
    },
  });  


export default Home;