import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {auth, db} from '../firebase/config'


import MyCamera from '../components/MyCamera'


export default class NewPost extends Component {

  constructor(props){
    super(props)
    this.state = {
      description: '',
      likes: [],
      comments: [],
      showCamera: true,
      url: '' ,
      activeUser: {},
    }
  }

  componentDidMount() {

    db.collection('users').onSnapshot((docs) =>{
        docs.forEach((oneDoc) =>{

            if(auth.currentUser.email === oneDoc.data().email){
                this.setState({
                    activeUser: {
                        id: oneDoc.id, 
                        data: oneDoc.data(),
                    }
                })
            }
        })
    })

}

  savePost(){

      db.collection('posts').add({
        createdAt: Date.now(),
        owner: auth.currentUser.email,
        ownerPhoto: this.state.activeUser.data.image,
        description: this.state.description,
        likes: [],
        comments: [],
        url: this.state.url,

      })
      .then((res)=>{
         console.log('El posteo fue exitoso');
         this.setState({
          description: "",
          showCamera: true,
         }, () => this.props.navigation.navigate('Home')) /* como el seteo de estado es asincronico, como segundo parametro ponemos adonde queremos que nos lleve cuando seteamos el estado  */
      })
      .catch(error => console.log(error))

  }

  onImageUpload(url){
    this.setState({
      url, /* No hace falta aclarar el valor de la propiedad ya que es igual a la propiedad */
      showCamera: false
    })
  }

  render() {
    return (
     
      <View style={styles.container}>
      
      {
        this.state.showCamera ?  /* Si la camara esta activada entonces: */
        
        <MyCamera 
          onImageUpload = { (url) => this.onImageUpload(url)}
        /> 
       
        : /* Si la camara no esta activa: */

        <View style={styles.container}>

        <View style={styles.header}>
				      <View style={styles.flexbox}>
					      <Text style={styles.username}>Nuevo Posteo</Text>
				      </View>
				</View>

          <Image source={{ uri: this.state.url }} style={styles.image} />

          <TextInput 
            style={styles.field}
            keyboardType='default'
            placeholder='Descripcion'
            onChangeText={text => this.setState({description: text})}
            multiline
          />

          <TouchableOpacity 
            style= {styles.button}
            onPress={()=> this.savePost()}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

        </View>
      }

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        paddingTop: 10,
        height:'100%',
        backgroundColor:'#dee2ff',
    },
    title:{
        marginBottom:20
    },
    header: {
      backgroundColor: 'purple',
      boxSizing: 'border-box',
      width: '100%',
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    flexbox: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      backgroundColor:'purple',
      justifyContent: 'space-between',
    },
    username: {
      textAlign: 'left',
      color: 'white',
      fontWeight: '600',
      fontSize: 15,
    },
    field:{
        borderColor: 'purple',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8,
        marginTop:10,
    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'purple',
    },
    buttonText:{
        color: '#fff'
    },
    image: {
      marginTop: 15,
      height: 300,
      width: "90%",
      borderRadius: 12,
    },
})
