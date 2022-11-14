import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

import Post from '../components/Post';

class Comments extends Component {
	
    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    }
    
   componentDidMount(){

        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc => {
            
            let post = [];
            docs.forEach( oneDoc => {
                post.push({
                    id: oneDoc.id,
                    data: oneDoc.data()
                })
            })

            this.setState({
                posts: posts
            })
        })



   }


    render(){
        // console.log(this.state);
        return(
                <View>
                    <Text>Comentarios</Text>
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={comment => comment.id}
                        renderItem = { ({item}) => <Post dataPost={item}{...this.props} />}
                    />
                </View>

        )
    }
}


export default Comments;