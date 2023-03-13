import React, { useState } from 'react'
import {StyleSheet, View ,FlatList } from 'react-native'
import AppPicker from '../components/Picker';
import * as Yup from "yup";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
  } from "../components/forms";
import ticketApi from '../api/ticket';
import AppText from '../components/Text';
import Card1 from '../components/Card1';
import { ListItemSeparator } from '../components/lists';
import { useNavigation } from '@react-navigation/native';

  const validationSchema = Yup.object().shape({
    status: Yup.object().required().nullable().label("Status"),
    
  });
const SearchTicketScreen = () => {
    const navigation=useNavigation()
    const items=[
        {
            value:1,
            label:'Initiated'
        },
        {
            value:2,
            label:'On Process'
        },
        {
            value:3,
            label:'Completed'
        },      
        {
            value:4,
            label:'Declined'
        },  
        {
            value:5,
            label:'Accepted'
        },
        {
            value:6,
            label:'Closed'
        },
    ]

    const [tickets,setTickets]=useState()
    const [statement,setStatement]=useState()

    async function handleSubmit({status}){
        const result=await ticketApi.bystatus(status.label)
        // console.log(result);
        if(result.data=='No Tickets on this status') {
             setStatement(result.data)
             setTickets(null)
        }
        else{
            setTickets(result.data)
            setStatement(null)
        }
        
    }
    return (
        <>
        <Form
        initialValues={{
          status: null,
        }}
        onSubmit={handleSubmit}
        // onSubmit={(values)=>console.log(values)}
        validationSchema={validationSchema}
      >
        
        <Picker
          items={items}
          name="status"
          placeholder="Status"
          width="50%"
        />
        <SubmitButton title={'Search'} style={{width:'20%'}}></SubmitButton>
        
        
      </Form>
      {tickets&&(
         <>
         <AppText style={{marginTop:10}}>Number of Tickets: {tickets.length}</AppText>
         <View style={styles.ticket}>
         <FlatList
         data={tickets}
         keyExtractor={(item,index)=>index.toString()}
         renderItem={({item})=>(
           <Card1 
           title={item.topic} admin_name={item.TID} status={item.current_status} 
           onPress={()=>navigation.navigate('viewTicket',item.TID)}
            />
         )}
         ItemSeparatorComponent={()=><ListItemSeparator />}
         ></FlatList>  
         </View>
         </>
      )}
      {statement&&(
        <AppText>{statement}</AppText>
      )}
        </>
    );
}

export default SearchTicketScreen;

const styles = StyleSheet.create({
    
})