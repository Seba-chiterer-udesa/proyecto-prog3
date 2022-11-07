import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

import { auth, db } from "../firebase/config";

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
	  loader: true,
      error: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      // Mantener logueado a un usuario
      if (user) {
        this.setState({
          logged: true,
        });
      } 
        this.setState({
          loader: false,
      });
    });
  } 

  HandleRegister(email, pass, username) {
    auth
      	.createUserWithEmailAndPassword(email, pass)
        .then((response) => {
        		db
				 .collection("users")
				 .add({
          			username: username,
          			createdAt: Date.now(),
        		});
        alert("¡Usuario registrado!");
        response.user.updateProfile({
          displayName: username,
        });
        this.setState({
          logged: true,
        });
      })
      .catch((error) => {
        console.log(error);
        if (
          error == "Error: The email address is already in use by another account."
        ) {
          alert("Este e-mail ya está registrado. Por favor, utilice otro.");
        }
        this.setState({
          error: "Error en el registro.",
        });
      });
  } 

  HandleLogin(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        console.log(response);
        alert("Iniciaste sesión.");
        this.setState({
          logged: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error en el inicio de sesión.");
        this.setState({
          error: "Error en el inicio de sesión.",
        });
      });
  } 

  HandleLogout() {
    auth
      .signOut()
      .then(() => {
        this.setState({
          logged: false,
        });
        alert("Cerraste sesión.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error en el deslogueo");
      });
  } 

  render() {

    const Tab = createBottomTabNavigator();

    return (

      <Tab.Navigator initialRouteName="Login">
       
	    {this.state.logged === true ? (
		
          <>

            <Tab.Screen name="Home">
              {(props) => (
                <Home
                  {...props}
                  logged={this.state.logged}
                  loader={this.state.loader}
                />
              )}
            </Tab.Screen>

			<Tab.Screen name="Mi perfil">
              {(props) => (
                <Profile
                  {...props}
                  HandleLogout={() => this.HandleLogout()}
                  loader={this.state.loader}
                />
              )}
            </Tab.Screen>

          </>

        ) : (
			
          <>
		  
            <Tab.Screen name="Iniciar sesión">
              {(props) => (
                <Login
                  {...props}
                  HandleLogin = {(email, pass) => this.HandleLogin(email, pass)}
                  loader= {this.state.loader}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Registrarme">
              {(props) => (
                <Register
                  {...props}
                  HandleRegister={(email, pass, username) => this.HandleRegister(email, pass, username)}
                />
              )}
            </Tab.Screen>

          </>
        )}

      </Tab.Navigator>
    ); 
  } 
} 

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#ff1f5a",
  },
}); */

