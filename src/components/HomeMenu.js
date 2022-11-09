import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* import { FontAwesome, Foundation } from '@expo/vector-icons'; */

const Tab = createBottomTabNavigator();

function HomeMenu() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home} />

			<Tab.Screen name="NewPost" component={NewPost} />  

			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

export default HomeMenu;


