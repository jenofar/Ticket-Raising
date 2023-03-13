import express from 'express';
import auth from '../middleware/auth.js';
import { insertdata,login,getall } from '../controller/AdminController.js';
// import { getall } from '../controller/TicketController.js';

const route=express.Router()

route.post('/register',insertdata)
route.post('/login',login)
route.get('/getall',getall)

export default route;