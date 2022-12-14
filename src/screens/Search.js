import React, { Component } from 'react';
import { db } from '../firebase/config';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList, Image} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default class Search extends Component {
   
    constructor() {
        super()
        this.state={
            users: [],
            results: [],
            filterBy:'',
            search: false
        }
    }

    componentDidMount(){
       
        db.collection('users').onSnapshot(docs =>{
            
            let users = [];
            
            docs.forEach(oneDoc =>{
            users.push( {
                id: oneDoc.id, 
                data: oneDoc.data()})
        })
            this.setState({
            users: users,        
            })
        })
    }
        
    filter(filtro){
         
        if (this.state.filterBy.length !== 0 ) {
            let filterResults = this.state.users.filter((user) => {return user.data.email.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({
                results: filterResults,
                filterBy: '',
                search: true,
            })  
        }else{
            this.setState({results: []})
        } 
        
    }

  render() {
    return (
        <ScrollView style={styles.main}>
            
            <View style={styles.container}>
            
            <TextInput 
                style={styles.search}
                keyboardType='default'
                placeholder='Buscar por Email'
                onChangeText={text => this.setState({filterBy: text})}
                value={this.state.filterBy}/>

            <TouchableOpacity
                style={styles.lupa} 
                onPress={ ()=> {this.filter(this.state.filterBy)}}>
                <Ionicons name="search-sharp" size={24} color="black" />
            </TouchableOpacity>

            </View>

            {this.state.results.length ?

            <View> 

            <Text style={styles.text}>Resultados de b??squeda</Text>
           
            <FlatList 
                data={this.state.results}
                keyExtractor={ (item) => item.id.toString()}
                ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: 'black', width: 300, marginVertical: 10, alignSelf:'center'}}></View>)}
                renderItem={({item})=> 
                
                <View style={styles.usersResults}> 
                    <Image source={{uri: item.data.image}} style={styles.profilePhoto}/>
                    <TouchableOpacity onPress= {()=> this.props.navigation.navigate("UserProfile",{ owner: item.data.email, bio:item.data.bio, image:item.data.image})}>
                        <Text style={styles.username}>{item.data.email}</Text>
                    </TouchableOpacity>
                </View>}>

            </FlatList>

            </View> 

            :

            this.state.search && 

            <View>
                <Text style={styles.text}>No encontramos usuarios que coincidan con la busqueda.</Text>
            </View>

            }
            
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#dee2ff'
    },
    container: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        marginHorizontal:6,
        backgroundColor:'#dee2ff'
    },    
    lupa: {
        alignSelf: 'center',
    },    
    search: {
        fontSize:17,
        borderColor: 'purple',
        backgroundColor: 'purple',
        color: 'white',
        borderStyle:'solid',
        borderRadius:5,
        borderWidth:0.5,
        marginVertical:9,
        marginHorizontal:18,
        padding:8,
        width:300,
    },
    usersResults: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 38,
        marginTop: 5
    },
    username: {
        alignSelf: 'center',
        fontSize: 15,
        paddingLeft: 15,
    },
    text: {
        fontSize: 22,
        marginBottom: 10,
        marginTop: 10,
        color: 'black',
        alignSelf: 'center'
    },
    profilePhoto: {
        height: '25px',
        width: '25px',
        borderRadius: 50
    },
})