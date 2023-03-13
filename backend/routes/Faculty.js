import express from 'express';
import auth from '../middleware/auth.js';
import { insertdata,login,profile, tickets } from '../controller/FacultyController.js';

const route=express.Router()

route.post('/register',insertdata);
route.post('/login',login);
route.post('/profile',profile)
route.post('/tickets',tickets)

export default route;