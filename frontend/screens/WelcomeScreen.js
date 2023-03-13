import React from "react";
import {  useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";

function WelcomeScreen(props) {
  const navigation=useNavigation();
  const reg=()=>{
    navigation.navigate("Register")
  }
  const log=()=>{
    navigation.navigate("Login")
  }
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/bg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
        <Text style={styles.tagline}>You name it, We do it</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={log} color='secondary'/>
        <Button title="Register" onPress={reg} color="secondary" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode:'cover'
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius:50
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
    color:'white'
  },
});

export default WelcomeScreen;
