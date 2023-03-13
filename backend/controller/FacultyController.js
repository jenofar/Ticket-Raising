import { Faculty,validatefaculty } from "../model/FacultySchema.js";
import { Admin } from "../model/AdminSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Ticket} from '../model/TicketSchema.js'

const insertdata=async (req,res)=>{
    validatefaculty(req.body)
    let SID;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let dept=req.body.dept;
    try {
        let sid=await Faculty.find().count()
        // console.log(sid);
        if(sid==0) {
            SID=dept+'01';
            // console.log(SID);
        }
        else{
            let sid1=await Faculty.findOne().sort({SID:-1})
            SID=Number(sid1.SID.slice(4))+1
            // console.log(SID);
            SID=dept+'0'+JSON.stringify(SID);
            // console.log(SID);
        }
        const edata=await Faculty.findOne({email:email})
        if(edata) return res.send("Email is already used")
        const salt_routes=10;
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data= await Faculty.insertMany({
                SID,
                name,
                email,
                password:hash,
                dept,
            })
            if(data) return res.send("Added Sucessfully")
        })
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    
    let email=req.body.email;
    let pwd=req.body.password;
    // console.log(email+" "+pwd);
    try {
        const data= await Faculty.findOne({email:email})
        const data1= await Admin.findOne({email:email})
        if(data){
        bcrypt.compare(pwd,data.password,async function(err, result){
            // console.log(result);
            if(result==true){
                const token=jwt.sign({_id:data._id,isAdmin:data.isAdmin,isCheif:data.isCheif},''+process.env.SECRET)
                // return res.header({'x-auth-token':token}).send('welcome '+data.name)
                // return res.send({'x-auth-token':token})
                return res.send(token)
            }
            return res.send("Please enter correct id and password")
        })
    }
    else if(data1){
    bcrypt.compare(pwd,data1.password,async function(err, result){
        // console.log();
        if(result==true){
            const token=jwt.sign({_id:data1._id,isAdmin:data1.isAdmin,isCheif:data1.isCheif},''+process.env.SECRET)
            // return res.header({'x-auth-token':token}).send('welcome '+data1.name)
            // return res.send({'x-auth-token':token})
            return res.send(token)
        }
        return res.send("Please enter correct  password")
    })
}
    else{
        return res.send("No user on that email")
    }
    } catch (error) {
       return res.send(error.message)
    }
}

const profile=async(req,res)=>{
    let id=req.body._id
    try {
        const data=await Faculty.findOne({_id:id})
        if(data) return res.send(data)
        const data1=await Admin.findOne({_id:id})
        if(data1) return res.send(data1)
        return res.send("error")
    } catch (error) {
        return res.send(error.message)
    }
}

const tickets=async(req,res)=>{
    let id=req.body._id
    try {
        const data=await Ticket.find({created_by:id})
        if(data.length>0)return res.send(data)
        return res.send("No Ticket created by you")
    } catch (error) {
        return res.send(error.message)
    }
}

export {insertdata,login,profile,tickets}