import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AccountScreen from '../../screens/AccountScreen'
// import MessageScreen from '../../screens/MessagesScreen'
import CheifAppNavigation from './CheifAppNavigation';
import AdminRegisterScreen from '../../screens/AdminRegisterScreen';
const Stack= createNativeStackNavigator();
const AccountNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='home' component={CheifAppNavigation} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='addadmin' component={AdminRegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AccountNavigator;