import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image, ScrollView, Camera , TextInput} from 'react-native';

import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';

import Load from '../components/Load';

class Comments extends Component {
	
    constructor(props){
        super(props);
        this.state={
            comments:[],
            load: true,
            user: {},
            comment:'',
        }
    }
    
   componentDidMount(){

    db.collection('posts').doc(this.props.route.params.id).onSnapshot(
        doc=>{
        this.setState({
            load:false,
            comments: doc.data().comments
        })
    })

    db.collection('users')
    .where('userName', '==', auth.currentUser.displayName)
    .onSnapshot(docs => {
        let user = {};
        docs.forEach( onedoc => {
        user = ( {
            id: onedoc.id, 
            data: onedoc.data()})
    })
        this.setState({
        user: user,
        })
    })

   }

   Comment() {
   
    if (this.state.comment == '') {
        return
    } else {
        db.collection('posts').doc(this.props.route.params.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({ 
               text: this.state.comment,
               owner: auth.currentUser.displayName,
               createdAt: Date.now()
               /* image: this.state.user.data.image, */
            })
        })
        .then(() => {
            this.setState({
                comment: '',
            })
        })
        .catch(error => console.log(error))
    }
}


    render(){
        
        return(
            
            this.state.load ? <Load/> :
            
            <ScrollView>
               
                <View style={styles.container}>

                <Text style={styles.text}>Agregar Comentario</Text>

                {this.state.comments.length ?
               
                <FlatList
                    data={this.state.comments}
                    keyExtractor={item => item.createdAt} 
                    ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 300, marginVertical: 5, alignSelf:'center'}}></View>)}
                    renderItem={({item})=>
                    
                    <View style={styles.commentlist}>

                        {item.image ?
                            <Image source={{uri: item.image}} style={styles.photo}/>
                        :
                            <FontAwesome name="user-circle" size={40} color="black" />
                        }
                        <Text style={styles.username}><strong>{item.owner}</strong></Text>
                        <Text style={styles.commetText}>{item.text}</Text>
                    </View>}>

                </FlatList>

                :
                
                <View>
                    <Text style={styles.nocomment}>Todavía no hay comentarios.</Text>
                </View>

                }

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Agregar comentario'
                    onChangeText={ text => this.setState({comment:text})}
                    value={this.state.comment}
                />

                <TouchableOpacity
                    style={styles.commentcreate}
                    onPress={()=>{this.Comment(this.state.comment)}}>
                
                <Text style={styles.share}>Publicar</Text>
                
                </TouchableOpacity>

                </View>

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    input: {
        fontSize:16,
        borderColor: '#552586',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:16,
        padding:8,
        width:280,
        marginTop: 30
    },
    commentcreate: {
        padding:8,
        backgroundColor:'blue',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
    share: {
        fontSize:24,
        color:'#FFFF',
    },
    text: {
        fontSize: 20,
        color: 'black',
        marginBottom: 30,
        marginTop: 10,
        alignSelf: 'center'
    },
    nocomment: {
        color: 'red',
        alignSelf: 'center'
    },
    commentlist: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        paddingLeft: 20
    },
    commentText: {
        padding: 5
    },
    username: {
        paddingLeft: 8
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 50
    }    
})


export default Comments;