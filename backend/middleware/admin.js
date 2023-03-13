import env from 'dotenv/config'
import jwt from 'jsonwebtoken'

function  admin(req,res,next){
    if(req.user.isAdmin==false) return res.send('Sorry!, Only Admin can make the changes')
        next();
}

export default admin