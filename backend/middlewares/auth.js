const jwt=require('jsonwebtoken');
const JWT_SECRET=require('../config');

const authMiddleware=function(req,res,next){
    const auth1=req.headers.authorization;
    if(!auth1 || !auth1.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token=auth1.split(' ')[1];

    try{
        const decoded=jwt.verify(token,JWT_SECRET)  //true or false
        if(decoded.userId){
            req.userId=decoded.userId 
            next(); 
        }
        else{
            return res.status(403).json({})
        }
    }
    catch(err){
        return res.status(403).json({})
    }
    
    
        
    
}

module.exports={ authMiddleware }