import {create} from 'apisauce'
// import cache from '../app/utility/cache';

const apiClient=create({
    baseURL:"http://192.168.42.157:3005/api"   
});

const get=apiClient.get;
apiClient.get=async(url,params,axiosConfig)=>{
    const response=await get(url,params,axiosConfig)
    console.log(response);
    // if(response.ok){
    //     cache.store(url,response.data)
        return response
    // }
    // const data=await cache.get(url)
    // return data ? {ok:true,data} :response

}



export default apiClient
