import React from "react";

import { StyleSheet, Text, View, Image,TouchableWithoutFeedback } from "react-native";

 

const Card1 = ({ title, admin_name, status, onPress }) => {

  return (

    <TouchableWithoutFeedback onPress={onPress}>

    <View  style={styles.container}>

      <View style={styles.detailsContainer}>

        <Text style={styles.title}>{title}</Text>

        <Text>Ticket ID: {admin_name}</Text>

      </View>
      {status=='Completed'||status=='Closed'||status=='Accepted'?<Text style={[styles.status,{color:'green'}]}>{status}</Text>:(<>{status=='Declined'?<Text style={[styles.status,{color:'red'}]}>{status}</Text>:<Text style={styles.status}>{status}</Text>}</>)}
      

    </View>

    </TouchableWithoutFeedback>

  );

};

 

const styles = StyleSheet.create({

  container: {

    // backgroundColor: "gray",

    // flex: 1,

    borderRadius: 15,

    backgroundColor: "white",

    overflow:"hidden",
    flexDirection:'row',
    borderColor:'grey',
    borderWidth:1

  },

  detailsContainer:{

      padding:10,
      flex:0.9

  },

  title:{
      
      marginBottom:10,
      fontSize:20
    //   fontWeight:600,

  },
  status:{
    marginTop:25,
    fontWeight:700,
    color:'blue'
  }

});

export default Card1;