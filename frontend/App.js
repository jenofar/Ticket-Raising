import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Screen from './components/Screen';
import AuthNavigation from './components/navigation/AuthNavigation';
import ListingEditScreen from './screens/ListingEditScreen'
import AppNavigation from './components/navigation/AppNavigation';
import MessagesScreen from './screens/MessagesScreen';

import NetInfo,{useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage'
import OffLineNotice from './components/OffLineNotice';
import LoginScreen from './screens/LoginScreen';
import { useState,useEffect } from 'react';
import AuthContext from './app/auth/context';
import jwtDecode from 'jwt-decode'
import authStorage from './app/auth/storage'
import FacultyHome from './screens/FacultyHome';
import RaiseTicketScreen from './screens/RaiseTicketScreen';
import SearchTicketScreen from './screens/SearchTicketScreen';
import CheifAppNavigation from './components/navigation/CheifAppNavigation';
import AdminRegisterScreen from './screens/AdminRegisterScreen';
import AccountNavigator from './components/navigation/AccountNavigator';
import AssignTicketScreen from './screens/AssignTicketScreen';
import AdminAppNavigation from './components/navigation/AdminAppNavigation';
// import DrawerNavigation from './components/navigation/DrawerNavigation';

// import NetInfo from '@react-native-community/netinfo'
export default function App() {
  const [user,setUser]=useState();
  const [token,setToken]=useState()
  // const authContext= useContext(AuthContext)
 
  // const unsubscribe =NetInfo.addEventListener(NetInfo=>console.log())
// const example=async()=>{
//   try {
//     // await AsyncStorage.setItem('student',JSON.stringify({rno:100}));
//     const result=await AsyncStorage.getItem('student');
//     const student= JSON.parse(result);
//     console.log(student);
//   } catch (error) {
//     console.log(error);
//   }
// }

  // unsubscribe();
  // const netinfo=useNetInfo();
  // return netinfo.isInternetReachable ? <View style={{flex:1 }}><Text>Welcome</Text></View> : <View><Text>Offline</Text></View>
  // example()
  // return null;
  // <Button title='Go online' disabled={netinfo.isInternetReachable}></Button>
  return(
    <Screen>
      
      {/* <FacultyHome /> */}
      <AuthContext.Provider value={{user,setUser,token,setToken}}>
      {user?<> {user.isCheif?<AccountNavigator />:user.isAdmin?<AdminAppNavigation />:<AppNavigation />} </>: <AuthNavigation/>}
      </AuthContext.Provider>
      {/* <AssignTicketScreen /> */}
      {/* <AdminRegisterScreen /> */}
      {/* <SearchTicketScreen /> */}
      {/* <RaiseTicketScreen /> */}
      {/* <AppNavigation /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
