import React, { useEffect, useState } from 'react'
import {FlatList, StyleSheet, View  } from 'react-native'
import authApi from '../api/auth'
import AdminList from '../components/AdminList';
import { Form, FormField, SubmitButton } from "../components/forms";
import AppText from '../components/Text';
import ticketApi from '../api/ticket';
import { useNavigation } from '@react-navigation/native';

const AssignTicketScreen = ({route}) => {
    const [admins,setAdmins]=useState()
    const navigation=useNavigation()
    const TID=route.params
    async function getadmin(){
        const result=await authApi.getadmins()
        // console.log(result.data);
        setAdmins(result.data)
    }
    async function handleSubmit({AID}){
        const result=await ticketApi.assign(AID,TID)
        // console.log(result);
        if(result.data.acknowledged) {
             alert('Assigned Successfully')
            navigation.navigate('Home')
    }    }
    useEffect(()=>{
        getadmin()
    },[])
    return (
        <>
        <Form
        initialValues={{AID:""}}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
        
        <FormField
        autoCorrect={false}
        icon="account"
        name="AID"
        placeholder="Admin ID *"
      />
      <SubmitButton title="Assign" />
      </Form>
      <AppText>Admins</AppText>
      <View style={{flexDirection:'row',padding:10}}>
        <AppText style={styles.text}>AID</AppText>
        <AppText style={styles.text}>Name</AppText>
      </View>
      <View style={{padding:10}}>
      <FlatList
      data={admins}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>(
        <AdminList AID={item.AID} name={item.name}/>
      )}
      >

      </FlatList>
      </View>
        </>
    );
}

export default AssignTicketScreen;
const styles = StyleSheet.create({
    text:{
        flex:1
    }
})