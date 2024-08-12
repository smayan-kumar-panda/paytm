const mongoose=require('mongoose')

//database connection
mongoose.connect("mongodb+srv://pandasmayan:l2fLQyH9yPZU1lqL@cluster0.tu4ntjs.mongodb.net/paytm")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        minLength:5,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:30
    }
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Mongoose.Schema.Types.ObjectId,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User=mongoose.model('User',userSchema)
const Account=mongoose.model('Account',accountSchema)

module.exports={ User,Account };