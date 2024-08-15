//all the real routes are here

const express=require('express')
const router=express.Router();
const userSchema=require('./zod')
const updateUser=require('./zod')
const User=require('../db')
const Account=require('../db')
const jwt=require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleware } = require('../middlewares/auth');

router.post('/signup',async function(req,res){
    const userInput=req.body
    const res=userSchema.safeParse(userInput)

    if(!success){
        return res.status(404).json({
            message:'invalid input'
        })
    }
    else{
        const user=User.findOne({
            username:body.username
        })

        if(user._id){
            return res.json({
                message: "Email already taken / Incorrect inputs"
            })
        }
        else{
            const dbUser=await User.create(userInput)
            const token=jwt.sign({
                userId:dbUser._id,  //req.userId=decoded.userId 
            },JWT_SECRET)  //gives a unique token which is stored in the browser

            res.status(200).json({
                message: "User created successfully",
	            token: token
            })

            Account.create({
                userId:dbUser._id,
                balance:1+Math.random()*10000
            })
        }
        

       
    }
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.put('/',authMiddleware,async function(req,res){
    const userInput=req.body
    const result=updateUser.safeParse(userInput)

    if(!result.success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(userInput,{
        id:req.userId
    })
    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk',function(req,res){
    const filter=req.query.filter || ""  //to get the names in the query parameter or searches for an empty string in the database
    const users=User.findOne({   //gives a group of user with similar names
        $or:[
            {
                firstName:{
                    "$regex":filter
                },

            },{
                lastName:{
                    "$regex":filter
                }
            }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=userRouter;