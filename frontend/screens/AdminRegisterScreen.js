import React from "react";
import { StyleSheet,ImageBackground } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
// import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const AdminRegisterScreen = () => {
    // const navigation=useNavigation()
  async function handleSubmit({name,email,password}){
    //  console.log(name,email,password);
     const result=await authApi.adminreg(name,email,password)
    //  console.log(result)
     if(result.ok){
      if(result.data=='Email is already used') return alert('Email is already used')
      
       alert('user added')
       navigation.navigate('home')
     }
 
   }
    return (
        <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/bg.jpg")}
    >
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        // onSubmit={values=>console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name *"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email *"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password *"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
    </ImageBackground>
    );
}

export default AdminRegisterScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        resizeMode:'cover'
      },
      container: {
        padding: 10,
        justifyContent:'center'
      },
})