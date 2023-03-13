import mongoose from 'mongoose';
import Joi from 'joi';

const ticketSchema= new mongoose.Schema({
    TID:{
        type:String
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['Furniture','Projector','Network Connection','Electrical Needs','System Issues','Transport','Smart Boards','Books','Other']
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Faculty',
    },
    created_date:{
        type:Date,
        default:Date.now()
    },
    assigned_on:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
    },
    current_status:{
        type:String,
        enum:['Initiated','Assigned','On Process','Completed','Declined','Accepted','Closed'],
        default:'Initiated'
    },
    assigned:{
        date:{type:Date},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    },
    process:{
        date:{type:Date},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    },
    decline:{
        date:{type:Date},
        reason:{type:String},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    },
    complete:{
        date:{type:Date},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    },
    accept:{
        date:{type:Date},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    },
    close:{
        date:{type:Date},
        Istrue:{type:Boolean,enum:['true','false'],default:'false'}
    }
})

var Ticket=mongoose.model('Ticket',ticketSchema)

export {Ticket}