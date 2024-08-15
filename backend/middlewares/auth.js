const jwt=require('jsonwebtoken');
const JWT_SECRET=require('../config');

//the jwt token is present in the authorization section of headers in inspect
const authMiddleware=function(req,res,next){
    const auth1=req.headers.authorization;
    if(!auth1 || !auth1.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token=auth1.split(' ')[1];

    try{
        const decoded=jwt.verify(token,JWT_SECRET)  //returns the decided data
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