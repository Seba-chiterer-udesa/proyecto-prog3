import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/components/HomeMenu';
import Comments from './src/screens/Comments'
import UserProfile from './src/screens/UserProfile';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

/* La primera Stack.Screen va a ser la primera vista que vea el usuario */

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="HomeMenu" component={HomeMenu} />
				<Stack.Screen options={{ headerShown: true }} name="Comments" component={Comments} />
				<Stack.Screen options={{ headerShown: true }} name="UserProfile" component={UserProfile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;