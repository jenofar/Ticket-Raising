import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AuthContext from "../app/auth/context";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
// import authStorage from "../app/auth/storage"
import authApi from "../api/auth";



function AccountScreen({navigation}) {
  const authContext= useContext(AuthContext)
  // const {user,setUser}=useContext(AuthContext)
  const [user,setUser]=useState()
  async function getprofile(){
    const result=await authApi.profile(authContext.user._id)
    // console.log(result.data);
    setUser(result.data)
}
useEffect(()=>{
  getprofile()
},[])
  return (
    <Screen style={styles.screen}>
      {user&&(
        <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/man.png")}
        />
      </View>
      )}
      
      
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>{
          authContext.setUser(null)
          authContext.setToken(null)
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
