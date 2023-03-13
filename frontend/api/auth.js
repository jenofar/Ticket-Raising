import React from 'react'
import client from './client.js'

// const login=(email,password)=>client.post('/auth',{email,password})
const login=(email,password)=>client.post('/faculty/login',{email,password})
const reg=(name,email,password,dept)=>client.post('/faculty/register',{name,email,password,dept})
const adminreg=(name,email,password)=>client.post('/admin/register',{name,email,password})
const profile=(_id)=>client.post('/faculty/profile',{_id})
const getadmins=()=>client.get('admin/getall')
export default {login,reg,profile,adminreg,getadmins}