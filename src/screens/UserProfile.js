import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { View, Text, FlatList, StyleSheet, Image} from 'react-native'

import Post from '../components/Post';

class UserProfile extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        posts: [],
      }
    } 
  
    componentDidMount() {
        
        db.collection('posts')
          .orderBy('createdAt', 'desc')
          .where('owner', '==', this.props.route.params.owner)
          .onSnapshot(
            (docs) => {
              let posts = []
              docs.forEach(oneDoc => {
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
    }
    
    render() {
    return (
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.flexbox}>
                <Image source={{uri: this.props.route.params.image}} style={styles.profilePhoto}/> 
                <Text style={styles.username}>{this.props.route.params.owner}</Text>
                
            </View>
          </View>
          <Text style={styles.biography}>
                    Biografía: {this.props.route.params.bio}
                </Text>
          <View>
                <Text style={styles.title}>Publicaciones de {this.props.route.params.owner}</Text>
          </View>
        
        {this.state.posts.length > 0 ?

            <FlatList
              data={this.state.posts}
              style={styles.posts}
              keyExtractor={post => post.id.toString()}
              renderItem = {({item}) => <Post dataPost={item}{...this.props} />}
            />
            
            :

            <View style={styles.noPost}>
					<Text style={styles.textNoPost}><strong>El usuario no posee publicaciones</strong></Text>
			</View>
           
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden', 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dee2ff',
      },
      profilePhoto: {
        height: '25px',
        width: '25px',
        borderRadius: 50
    },
      header: {
        backgroundColor: 'purple',
        boxSizing: 'border-box',
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'left'
      },
      flexbox: {
        flexWrap: 'wrap',
        flexDirection: 'row',
         margin: 6, 
        justifyContent: 'space-between',
        textAlign: 'left',
      },
      title:{
          padding:10,  
          fontSize: 15,
          color: 'black',
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
      },
      biography: {
        textAlign: "center",
        color: "black",
        fontWeight: "600",
        fontSize: 15,
        padding: 5,
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

  export default UserProfile;
