import { Ticket } from "../model/TicketSchema.js";
import { Faculty } from "../model/FacultySchema.js";
import { Admin } from "../model/AdminSchema.js";

const createTicket=async(req,res)=>{
    let TID
    let topic=req.body.topic
    let description=req.body.description
    let created_by=req.body._id
    let category=req.body.category
    let created_date=new Date()
    
    try {
        let sid=await Ticket.find().count()
        if(sid==0)  TID='tic'+'01';
        else{
            let sid1=await Ticket.findOne().sort({TID:-1})
            TID=Number(sid1.TID.slice(4))+1
            TID='tic'+'0'+JSON.stringify(TID);
        }
        
       const data=await Ticket.insertMany({
        TID,
        topic,
        category,
        description,
        created_by,
        created_date
       })
       if(data) return res.send(data)
        return res.send("error")
    } catch (error) {
        return res.send(error.message)
    }
}

const viewTicket=async(req,res)=>{
    let TID=req.body.TID
    try {
        const data=await Ticket.findOne({TID}).populate([{path:'created_by',select:'name'},{path:'assigned_on',select:'name'}])
        if(data) return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}
const getall=async(req,res)=>{
    try {
        const data=await Ticket.find().populate({path:'created_by'})
        if(data) return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}
const getticketsbystatus=async(req,res)=>{
    let current_status=req.body.status
    try {
        const data=await Ticket.find({current_status})
        if(data.length==0)return res.send("No Tickets on this status")
        return res.send(data)
    } catch (error) {
        return res.send(error.message) 
    }
}

const assignedtickets=async(req,res)=>{
    let _id=req.body._id
    try {
        const data=await Ticket.find({assigned_on:_id})
        if(data.length==0) return res.send('No tickets Assigned for you')
        return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}



const findticketstoassign=async(req,res)=>{
    try {
        const data=await Ticket.find({current_status:'Initiated'})
        if(data.length>0)return res.send(data)
        return res.send("No tickets available for assign")
    } catch (error) {
        return res.send(error.message)
    }
}

const assignTicket=async(req,res)=>{
    let TID=req.body.TID
    let AID=req.body.AID
    let assigned_on
    try {
        const tic=await Ticket.findOne({TID:TID})
        if(!tic) return res.send("There is no Ticket on that ID")
        const fac=await Admin.findOne({AID:AID},{_id:1})
        if(!fac) return res.send("There is no Admin on this ID")
        assigned_on=fac._id;
        const data=await Ticket.updateOne({TID:TID},{$set:{
            assigned_on,
            current_status:'Assigned',
            assigned:{
                Istrue:true,
                date:new Date()
            }
        }})
        if(data) return res.send(data)
        return res.send("error")
    } catch (error) {
        return res.send(error.message)
    }
    
}

const acceptTicket=async(req,res)=>{
    // let days=req.body.days
    let TID=req.body.TID
    let date=new Date()
    // let by=req.user._id

    // let ndate=new Date()
    // Date.prototype.addDays = function (days) {
    //     const date = new Date(this.valueOf())
    //     date.setDate(date.getDate() + days)
    //     return date
    //   }
    //   let expected_date=ndate.addDays(days)
      try {
        const check=await Ticket.find({TID:TID})
        if(check[0].current_status=='Declined') return res.send('This Ticket is already declined')
        // if(check[0].currently_assigned!=by) return res.send('Sorry!, this ticket is not assigned for you')
        
        const data=await Ticket.updateOne({TID:TID},{
            $set:{
                current_status:'On Process',
                process:{
                    date,
                    Istrue:true
                }
            }
        })
        if(data) return res.send(data)
        return res.send('error')
        
    } catch (error) {
        return res.send(error.message)
    }
}

const declineTicket=async (req,res)=>{
    let date=new Date()
    // let by=req.user._id
    let TID=req.body.TID
    let reason=req.body.reason
    try {
        // const check=await Ticket.find({TID:TID})
        // if(check[0].current_status=='Declined') return res.send('This Ticket is already declined')
        // if(check[0].currently_assigned!=by)return res.send('Sorry! this ticket is not assigned for you')
        const data=await Ticket.updateOne({TID:TID},{
            $set:{
                current_status:'Declined',
                decline:{
                    date,
                    reason,
                    Istrue:true
                }
            }
        })
        if(data) return res.send(data)
        return res.send('error')
    } catch (error) {
        return res.send(error.message)
    }
}
const completeTicket=async(req,res)=>{
    let date=new Date()
    // let by=req.user._id
    let TID=req.body.TID
    // let notes=req.body.notes
    try {
        const check=await Ticket.find({TID:TID})
        if(check[0].current_status=='Declined') return res.send('This Ticket is already declined')
        
        if(check[0].current_status!='On Process') return res.send('Ticket is not accepted. Please accept the ticket first')
        // if(check[0].currently_assigned!=by)return res.send('Sorry! this ticket is not assigned for you')
        
        const data=await Ticket.updateOne({TID:TID},{$set:{
            current_status:'Completed',
            complete:{
                date,
                Istrue:true
            }
        }})
        if(data) return res.send(data)
        return res.send('error')
    } catch (error) {
        return res.send(error.message)
    }
}

const facultyAccept=async(req,res)=>{
    let date=new Date()
    // let by=req.user._id
    let TID=req.body.TID
    try {
        // const check=await Ticket.find({TID:TID})
        // if(check[0].current_status=='Declined') return res.send('This Ticket is already declined')
        
        // if(check[0].current_status!='On Process') return res.send('Ticket is not accepted. Please accept the ticket first')
        // if(check[0].currently_assigned!=by)return res.send('Sorry! this ticket is not assigned for you')
        
        const data=await Ticket.updateOne({TID:TID},{$set:{
            current_status:'Accepted',
            accept:{
                date,
                Istrue:true
            }
        }})
        if(data) return res.send(data)
        return res.send('error')
    } catch (error) {
        return res.send(error.message)
    }
    
}
const closeTicket=async(req,res)=>{
    let TID=req.body.TID
    let date=new Date()
    try {
        // const check=await Ticket.find({TID:TID})
        // if(check[0].current_status=='Declined') return res.send('This Ticket is already declined')
        
        // if(check[0].current_status!='On Process') return res.send('Ticket is not accepted. Please accept the ticket first')
        // if(check[0].currently_assigned!=by)return res.send('Sorry! this ticket is not assigned for you')
        
        const data=await Ticket.updateOne({TID:TID},{$set:{
            current_status:'Closed',
            close:{
                date,
                Istrue:true
            }
        }})
        if(data) return res.send(data)
        return res.send('error')
    } catch (error) {
        return res.send(error.message)
    }
}

export {createTicket,closeTicket,facultyAccept,viewTicket,getall,assignedtickets,getticketsbystatus,assignTicket,acceptTicket,declineTicket,findticketstoassign, completeTicket}