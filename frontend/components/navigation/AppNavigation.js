import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingScreen from '../../screens/ListingsScreen'
import ListingEditScreen from '../../screens/ListingEditScreen'
import AccountScreen from '../../screens/AccountScreen'
import { MaterialCommunityIcons,Ionicons,EvilIcons,FontAwesome } from "@expo/vector-icons";
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import ListingsButton from './ListingsButton';
import RaiseTicketScreen from '../../screens/RaiseTicketScreen'
import FacultyHome from '../../screens/FacultyHome'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { useEffect } from 'react';
// import AccountScreen from '../../screens/AccountScreen';

const Tab= createBottomTabNavigator();
const AppNavigation = () => {
    // const navigation=useNavigation();
   
    return (
        <NavigationContainer>
            <Tab.Navigator>
            <Tab.Screen name='Home' component={FeedNavigator}  options={{tabBarIcon:({size,color})=>(<MaterialCommunityIcons size={size} color={color} name="home"/>), headerShown:false }} />

                {/* <Tab.Screen name='Feed' component={ListingScreen} options={{tabBarIcon:({size,color})=>(<MaterialCommunityIcons size={size} color={color} name="home"/>)}} /> */}
                <Tab.Screen 
            name="RaiseTicket" 
            component={RaiseTicketScreen}
            options={
                ({navigation})=>({
                tabBarButton:()=><ListingsButton onPress={()=>navigation.navigate("RaiseTicket")}/>,
                tabBarIcon:({size,color})=><MaterialCommunityIcons name="plus-circle" size={size} color={color}/>})}/>
                
                <Tab.Screen name='Account' component={AccountScreen} options={{tabBarIcon:({size,color})=>(<EvilIcons size={size} color={color} name="user"/>)}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

export default AppNavigation;