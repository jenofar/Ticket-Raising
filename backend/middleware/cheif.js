import env from 'dotenv/config'
import jwt from 'jsonwebtoken'

function  Cheif(req,res,next){
    if(req.user.isCheif==false) return res.send('Sorry!, Only Cheif can make the changes')
        next();
}

export default Cheif