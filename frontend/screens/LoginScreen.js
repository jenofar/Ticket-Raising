import React, { useContext, useState } from "react";
import { StyleSheet, Image,ImageBackground } from "react-native";
import * as Yup from "yup";
import {  useNavigation } from '@react-navigation/native';
import Screen from "../components/Screen";
import jwtDecode from "jwt-decode";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import AuthContext from "../app/auth/context";
import authStorage from "../app/auth/storage"
import axios from 'axios'
import { create } from "apisauce";
import loginApi from '../api/auth'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

 function LoginScreen(props) {
  const authContext= useContext(AuthContext)
  async function handleSubmit({email,password}){
    const result=await loginApi.login(email,password)
    if(!result.ok) return
    if(result.data=='Please enter correct id and password') return alert('Please enter correct id and password')
    if(result.data=="No user on that email") return alert("No user on that email")
    // console.log('token',result.data);
    const user=jwtDecode(result.data)
    // console.log(user);
   

    authContext.setToken(result.data)
    authContext.setUser(user)
  }

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/bg.jpg")}
    >
    <Screen style={styles.container}>
      
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <ErrorMessage error={"invalied email / password"} visible={loginFaild}/> */}
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
      
    </Screen>
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
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    borderRadius:50
  },
});

export default LoginScreen;
