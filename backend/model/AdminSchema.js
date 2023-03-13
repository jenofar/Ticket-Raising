import mongoose from 'mongoose';
import Joi from 'joi';

const adminSchema= new mongoose.Schema({
 AID:{
    type:String
 },
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 isAdmin:{
    type:Boolean,
    default:true
 },
 isCheif:{
    type:Boolean,
    default:false
 }
})

var Admin=mongoose.model('Admin',adminSchema)

function validateadmin(admin){
    const schema={
        SID:Joi.number(),
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        isCheif:Joi.boolean().default(false),
        isAdmin:Joi.boolean().default(true)
    }
}

export {Admin,validateadmin}