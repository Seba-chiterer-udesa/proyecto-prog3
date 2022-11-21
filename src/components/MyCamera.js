import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Camera} from 'expo-camera'
import {storage} from '../firebase/config'


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
                                <Text>Tomar Foto</Text>
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
                                style={styles.button}
                                onPress={()=>this.savePhoto()}>
                                <Text>Guardar Foto</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.clearPhoto()}>
                                <Text>Eliminar</Text>
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
        width:'50%',
        borderColor: '#ccc',
        backgroundColor:'#A2A2A2',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
        height:250,
    }
}) 

export default MyCamera;
