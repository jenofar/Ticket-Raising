import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import faculty from './routes/Faculty.js'
import admin from './routes/Admin.js'
import ticket from './routes/Ticket.js'

const app=express()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/TicketRaising')
.then(()=>console.log('db connected'))
.catch((e)=>console.log('error'))

app.use('/api/faculty',faculty)
app.use('/api/admin',admin)
app.use('/api/ticket',ticket)

app.get('/',(req,res)=>{
    res.send('server connceted')
})

const port=process.env.PORT || 3005
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})