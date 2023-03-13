import mongoose from 'mongoose';
import Joi from 'joi';

const facultySchema= new mongoose.Schema({
 SID:{
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
 dept:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 isAdmin:{
    type:Boolean,
    default:false
 },
 isCheif:{
    type:Boolean,
    default:false
 }
})

var Faculty=mongoose.model('Faculty',facultySchema)

function validatefaculty(faculty){
    const schema={
        SID:Joi.number(),
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        dept:Joi.string().required(),
        isCheif:Joi.boolean().default(false),
        isAdmin:Joi.boolean().default(false)
    }
}

export {Faculty,validatefaculty}