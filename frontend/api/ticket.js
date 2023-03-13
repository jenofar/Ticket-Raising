import client from './client.js'

const create=(topic,description,category,_id)=>client.post('ticket/create',{topic,description,category,_id})
const get=(_id)=>client.post('faculty/tickets',{_id})
const view=(TID)=>client.post('ticket/view',{TID})
const getall=()=>client.get('ticket/getall')
const bystatus=(status)=>client.post('ticket/getbystatus',{status})
const assign=(AID,TID)=>client.post('ticket/assign',{AID,TID})
const assigned=(_id)=>client.post('/ticket/assignedticks',{_id})
const accept=(TID)=>client.put('/ticket/accept',{TID})
const complete=(TID)=>client.put('/ticket/complete',{TID})
const facultyaccept=(TID)=>client.put('/ticket/facultyaccept',{TID})
const close=(TID)=>client.put('/ticket/close',{TID})
const decline=(TID,reason)=>client.put('/ticket/decline',{TID,reason})

export default {create,get,view,getall,bystatus,assign,assigned,accept,complete,facultyaccept,close,decline}