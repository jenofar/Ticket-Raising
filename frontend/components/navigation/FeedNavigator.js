import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListingScreen from '../../screens/ListingsScreen'
import ListingDetailsScreen from '../../screens/ListingDetailsScreen'
import MessagesScreen from '../../screens/MessagesScreen'
import FacultyHome from '../../screens/FacultyHome';
import ViewTicketScreen from '../../screens/ViewTicketScreen';
import AuthContext from '../../app/auth/context';
import { useContext } from 'react';
import CheifHome from '../../screens/CheifHome';
import SearchTicketScreen from '../../screens/SearchTicketScreen';
import AssignTicketScreen from '../../screens/AssignTicketScreen';
import AdminHome from '../../screens/AdminHome';
const Stack= createNativeStackNavigator();
const FeedNavigator = () => {
    const authContext=useContext(AuthContext)
    return (
        // <NavigationContainer>
            <Stack.Navigator mode="modal" presentation="modal" screenOptions={{presentation:"modal", gestureEnabled:true}}>
                <Stack.Screen name="Home" component={authContext.user.isCheif?CheifHome:authContext.user.isAdmin?AdminHome:FacultyHome} options={{headerShown:false}}/>
                <Stack.Screen name="viewTicket" component={ViewTicketScreen} options={{gestureEnabled:true, presentation:"modal"}}/>
                {/* <Stack.Screen name="Search" component={SearchTicketScreen} options={{headerShown:true}}/> */}
                <Stack.Screen name='assign' component={AssignTicketScreen} />
                {/* <Stack.Screen name="listingdetails" component={ListingDetailsScreen} screenOptions={{gestureEnabled:true, headerShown:false, presentation:"modal" }}/> */}
            </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default FeedNavigator;