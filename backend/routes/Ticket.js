import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import Cheif from '../middleware/cheif.js';
import { acceptTicket,viewTicket,assignedtickets, assignTicket, completeTicket, createTicket, declineTicket,findticketstoassign, getticketsbystatus, getall, facultyAccept, closeTicket } from '../controller/TicketController.js';

const route=express.Router()


route.post('/create',createTicket)
route.post('/view',viewTicket)
route.post('/getbystatus',getticketsbystatus)
route.get('/getall',getall)
route.post('/assignedticks',assignedtickets)
route.get('/findticketstoassign',auth,admin,Cheif,findticketstoassign)
route.post('/assign',assignTicket)
route.put('/accept',acceptTicket)
route.put('/decline',declineTicket)
route.put('/complete',completeTicket)
route.put('/facultyaccept',facultyAccept)
route.put('/close',closeTicket)

export default route;