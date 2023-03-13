import React, { useContext, useEffect, useState } from 'react'
import { View ,StyleSheet, Modal} from 'react-native'
import AppText from '../components/Text';
import ticketApi from '../api/ticket';
import AuthContext from '../app/auth/context';
import AppButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';
// import auth from '../api/auth';
import { Form, FormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";
// import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    reason: Yup.string().label("Reason"),
  });

const ViewTicketScreen = ({route}) => {
    const navigation=useNavigation()
    let TID=route.params
    const [ticket,setTicket]=useState()
    const [decline,setDecline]=useState(false)
    const authContext=useContext(AuthContext)


    async function acceptTick(){
        const result=await ticketApi.accept(TID)
        // console.log(result);

        if(result.ok){
            alert('Ticket Accepted')
            navigation.navigate('Home')}
    }

    async function handleSubmit({reason}){
        const result=await ticketApi.decline(TID,reason)
        // console.log(result);
        if(result.ok){
            alert('Ticket Declined')
            navigation.navigate('Home')}
    }
    async function completeTick(){
        const result=await ticketApi.complete(TID)
        // console.log(result);

        if(result.ok){
            alert('Ticket Completed')
         return(   
            navigation.navigate('Home')
         )
        }
    }
    async function facultyaccepttick(){
        const result=await ticketApi.facultyaccept(TID)
        if(result.ok){
            alert('Ticket Accepted')
         return(   
            navigation.navigate('Home')
         )
        }
    }
    async function closeTick(){
        const result=await ticketApi.close(TID)
        // console.log(result);
        if(result.ok){
            alert('Ticket Closed')
         return(   
            navigation.navigate('Home')
         )
        }
    }
    async function viewticket(){
        const result=await ticketApi.view(TID)
        if(!result.ok) return
        setTicket(result.data)
    }
    useEffect(()=>{
        viewticket()
    },[])

    return (
        <>
        <View>
            {ticket&&(<>
            <AppText style={styles.text}>Ticket ID: {ticket.TID}</AppText>
            <AppText style={styles.text}>Title: {ticket.topic}</AppText>
            <AppText style={styles.text}>Description: {ticket.description}</AppText>
            <AppText style={styles.text}>Category: {ticket.category}</AppText>
            <AppText style={styles.text}>Created by: {ticket.created_by.name}</AppText>
            <AppText style={styles.text}>Created Date: {ticket.created_date}</AppText>
            <AppText style={styles.text}>Status: {ticket.current_status}</AppText>
            {ticket.assigned.Istrue?(<>
            <AppText style={styles.text}>Assigned Date: {ticket.assigned.date}</AppText>
            <AppText style={styles.text}>Assigned On: {ticket.assigned_on.name}</AppText>
            {authContext.user.isAdmin&&authContext.user._id==ticket.assigned_on._id&&(!ticket.process.Istrue&&!ticket.decline.Istrue)?<>
            <AppButton title={'Accept'} onPress={()=>acceptTick()}></AppButton>
            <AppButton title={'Decline'} onPress={()=>setDecline(true)}></AppButton>
            </>:null}
            </>):<>{authContext.user.isCheif&&<AppButton title='Assign Ticket' onPress={()=>(navigation.navigate('assign',TID))}></AppButton>}</>}
            {ticket.process.Istrue&&(<>
            <AppText style={styles.text}>Process Start Date: {ticket.process.date}</AppText>
            {authContext.user.isAdmin&&authContext.user._id==ticket.assigned_on._id&&!ticket.complete.Istrue?
            <AppButton title={'Complete'} onPress={()=>completeTick()}></AppButton>
            :null}
            </>)}
            {ticket.decline.Istrue&&(<>
            <AppText style={styles.text}>Declined Date: {ticket.decline.date}</AppText>
            <AppText style={styles.text}>Reason: {ticket.decline.reason}</AppText>
            </>)}
            {ticket.complete.Istrue&&(<>
            <AppText style={styles.text}>Completed Date: {ticket.complete.date}</AppText>
            {!authContext.user.isAdmin&&!ticket.accept.Istrue?
            <>
            <AppButton title={'Accept'} onPress={()=>facultyaccepttick()}></AppButton>
            </>:null}
            </>)}
            {ticket.accept.Istrue&&(<>
            <AppText style={styles.text}>Accepted Date: {ticket.accept.date}</AppText>
            {authContext.user.isCheif&&!ticket.close.Istrue&&(<AppButton title={'Close Ticket'} onPress={()=>closeTick()}/>)}
            </>)}
            {ticket.close.Istrue&&(<>
            <AppText style={styles.text}>Closed Date: {ticket.close.date}</AppText>
            </>)}
            </>)}
            
        </View>
        <Modal visible={decline}>
        <Form
        initialValues={{
          reason: "",
        }}
        onSubmit={handleSubmit}
        // onSubmit={(values)=>console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          maxLength={255}
          multiline
          name="reason"
          numberOfLines={3}
          placeholder="Reason"
        />
        <SubmitButton title="Decline" />
        <AppButton title={'Close'} onPress={()=>setDecline(false)}></AppButton>
      </Form>
        </Modal>
        </>
    );
}

export default ViewTicketScreen;

const styles = StyleSheet.create({
    text:{
        marginVertical:5
    }
})