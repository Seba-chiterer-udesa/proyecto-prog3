import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Search from '../screens/Search'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeMenu() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home}  options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}} />
			<Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }} />
            <Tab.Screen name='Search' component={Search} options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>
             <Tab.Screen name="NewPost" component={NewPost}  options={{ tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }} />
		</Tab.Navigator>
	);
}

export default HomeMenu;


