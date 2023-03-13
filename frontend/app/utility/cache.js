import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment, { now } from "moment";

const expiryInMinutes=5;

const store=async(key,value)=>{
    try {
        const item={
            value,
            timestamp:Date.now()
        }
        
        
        await AsyncStorage.setItem(key,JSON.stringify(item))
    } catch (error) {
        console.log(error);
    }
}

const get=async(key)=>{
    try {
        const result= await AsyncStorage.getItem(key)
        const item=JSON.parse(result)
        console.log(item);
        if(!item) return null;

        const now= moment(Date.now());
        const stored_timestamp= moment(item.timestamp);
        const isExpried= now.diff(stored_timestamp,'minutes')>expiryInMinutes;
        if(isExpried){
            await AsyncStorage.removeItem(key)
            return null;
        }
        return item.value;
    } catch (error) {
        console.log(error);
    }
}

export default{
    store,
    get
}