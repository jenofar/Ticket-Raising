import React, { useContext, useEffect, useState } from 'react'
import {  StyleSheet, TouchableOpacity, View, FlatList} from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from '../components/Text';
import Card1 from '../components/Card1';
import { ListItemSeparator } from '../components/lists';
import AppButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Slideshow from 'react-native-image-slider-show';
import AuthContext from '../app/auth/context';
import authApi from '../api/auth';
import ticketApi from '../api/ticket';
import { useIsFocused } from "@react-navigation/native";

const AdminHome = () => {
    const navigation=useNavigation()
    const authContext=useContext(AuthContext)
    const [data,setData]=useState()
    const [tickets,setTickets]=useState()
    
    const dataSource= [
        { url:require('../assets/c-issue.jpg') },
        { url:require('../assets/projector-issue.jpg') },
        { url:require('../assets/clean-issue.jpg') },
        {url:require('../assets/network-issue.png')},
        {url:require('../assets/table-issue.jpg')},
        {url:require('../assets/clgbus-issues.jpg')},
        {url:require('../assets/smartboard-issue.jpg')}
    ]
    const [position,setPosition]=useState(0)
    const isFocused = useIsFocused();
    // console.log(authContext.user);
    const [statement,setStatement]=useState()

    async function getprofile(){
        const result=await authApi.profile(authContext.user._id)
        // console.log(result.data);
        setData(result.data)
    }
    async function gettickets(){
        const result=await ticketApi.assigned(authContext.user._id)
        // console.log(result);
        if(result.data=='No tickets Assigned for you') return setStatement('No tickets Assigned for you')
        setTickets(result.data)
    }
    useEffect(()=>{
        getprofile()
        gettickets()
        const toggle=setInterval(()=>{
            setPosition(position===dataSource.length-1?0:position+1)
        },3000)
        return ()=>clearInterval(toggle)
    },[isFocused])
    return (
        <>
        <View style={styles.welcome}>
            <View style={{flex:1}}>
                {data&&(<AppText>Welcome {data.name}</AppText>)}
                
            </View>
            <TouchableOpacity >
                <View style={styles.menubtn}>
              <MaterialCommunityIcons name='menu' color={'black'} size={25}></MaterialCommunityIcons>
              </View>  
            </TouchableOpacity>
        </View>
        <View style={{borderRadius:25,backgroundColor:'pink',overflow:'hidden'}}>
        <Slideshow 
        position={position}
        dataSource={dataSource}
        />
        </View>
        {statement&&(
            <AppText>{statement}</AppText>
        )}
        
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
        
        </>
    );
}

export default AdminHome;

const styles = StyleSheet.create({
    menubtn:{
        // backgroundColor:'black',
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:'100%'
    },
    welcome:{
        // backgroundColor:'grey',
        height:'10%',
        width:'100%',
        // justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        // borderBottomEndRadius:10,
        // borderBottomStartRadius:10,
        fontSize:25
    },
    ticket:{
        marginTop:15,
        flex:1
    }
})