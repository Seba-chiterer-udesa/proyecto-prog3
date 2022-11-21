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
                <View>
                    <Text>Posteos</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item}{...this.props} />}// los tres puntos ... se llaman spread operator
                         /* usamos ...this.props porque tenemos que pasar el objeto de navegacion, nevigation y route */
                    />
                </View>

        )
    }
}


export default Home;