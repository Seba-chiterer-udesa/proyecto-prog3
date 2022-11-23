import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Camera} from 'expo-camera'
import {storage} from '../firebase/config'

import { Entypo } from '@expo/vector-icons';


class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri: ""
        }
        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( ()=> this.setState({
            permission: true
        }))
        .catch ( error => console.log(error))
    }

    takePhoto(){
        
        this.metodosDeCamara.takePictureAsync()
            .then( photo => this.setState({
                uri: photo.uri,
                showCamera: false /* dejo de mostrar la camara cuando saco la foto. */
            }))
            .catch (error => console.log(error))
    }

    savePhoto(){
    
        fetch(this.state.uri)
            .then( res => res.blob())
            .then( image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                        .then((uri)=> {
                            this.props.onImageUpload(uri)  // viene del componente padre
                        })
                    })
            })
            .catch(error => console.log(error))
    }

    clearPhoto(){
        console.log("Guardar Foto")
        this.setState({
            uri: '',
            showCamera: true
        })
    }


  render() {
    return (
        <View style={styles.cameraBody}>
            {
                this.state.permission ? 
                    this.state.showCamera ?
                        <View style={styles.cameraBody}>
                            <Camera 
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref= {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} 
                            />

                            <TouchableOpacity 
                                style={styles.button}
                                onPress = { ()=>this.takePhoto()}>
                                <Entypo name="camera" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
                        
                        :
                        
                        <View>
                            
                            <Image 
                                style={styles.preview}
                                source={{uri: this.state.uri}}
                                resizeMode='cover'
                            />
                            
                            <TouchableOpacity 
                                style={styles.button2}
                                onPress={()=>this.savePhoto()}>
                                <Text style={styles.text}>Guardar Foto</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.button2}
                                onPress={()=>this.clearPhoto()}>
                                <Text style={styles.text}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                        
                        :

                        <Text>No Hay permisos para la camara</Text>
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    cameraBody: {
        height: '100%',
        justifyContent:'center',
    },
    button:{
        height: '20%',
        width:'40%',
        borderColor: '#ccc',
        backgroundColor:'purple',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20,
    },
    button2:{
        height: '20%',
        width:'30%',
        borderColor: '#ccc',
        backgroundColor:'purple',
        color:'white',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
    preview:{
        height:250,
    },
    text:{
        color:'white' 
    },
}) 

export default MyCamera;
