import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Constants } from 'expo-constants';
import {useNetInfo} from '@react-native-community/netinfo'


function OffLineNotice(props) {
const netInfo= useNetInfo();
// console.log(netInfo);
if(netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
  return (
    <View style={styles.container}>
        <Text style={styles.text}>No InterNet</Text>
    </View>
  );
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    fontSize:20,
    color:"red"
  }
});

export default OffLineNotice;