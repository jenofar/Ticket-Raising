import {useState} from 'react'
// import listingsApi from "../api/Listing";
export default useApi=(apiFunc)=>{

    const [error,setError]=useState(false);
    // const [listings,setListings]=useState([]);
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState([]);

    const request = async(...args)=>{
        setLoading(true)
        const response= await apiFunc(...args);
        // console.log(response);
        setLoading(false)
        if(!response.ok) return setError(true)
        setError(false);
        setData(response.data)
    }

    return {error, data, loading, request};
 

    // const loadListings=async()=>{
    //     setLoading(true)
    //     const response = await  listingsApi.getListings();
    //     setLoading(false)
    //     if(!response.ok) return setError(true)
    //     setError(false);
    //     setListings(response.data)  
    //   };

      

}