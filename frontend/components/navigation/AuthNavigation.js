import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../screens/WelcomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
const Stack= createNativeStackNavigator();
const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:true}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:true}}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}

export default AuthNavigation;