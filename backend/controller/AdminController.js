import { Admin, validateadmin} from '../model/AdminSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const insertdata=async (req,res)=>{
    
    validateadmin(req.body)
    let AID;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    
    try {
        let aid=await Admin.find().count()
        // console.log(sid);
        if(aid==0) {
            AID='admin'+'01';
            // console.log(SID);
        }
        else{
            let aid1=await Admin.findOne().sort({AID:-1})
            AID=Number(aid1.AID.slice(6))+1
            // console.log(SID);
            AID='admin'+'0'+JSON.stringify(AID);
            // console.log(SID);
        }
        const edata=await Admin.findOne({email:email})
        if(edata) return res.send("Email is already used")
        const salt_routes=10;
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data= await Admin.insertMany({
                AID,
                name,
                email,
                password:hash,
                
            })
            if(data) return res.send("User Added")
        })
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    
    let email=req.body.email;
    let pwd=req.body.pwd;
    // console.log(email+" "+pwd);
    try {
        const data= await Admin.findOne({email:email})
        if(data){
        bcrypt.compare(pwd,data.password,async function(err, result){
            // console.log();
            if(result==true){
                const token=jwt.sign({_id:data._id,isAdmin:data.isAdmin,isCheif:data.isCheif},''+process.env.SECRET)
                return res.header({'x-auth-token':token}).send('welcome '+data.name)
                // return res.send({'x-auth-token':token})
                // return res.send(data)
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

const getall=async(req,res)=>{
    try {
        const data=await Admin.find()
        if(data) return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

export {insertdata,login,getall}