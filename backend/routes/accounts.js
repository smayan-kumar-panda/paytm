const express=require('express');
const { authMiddleware } = require('../middlewares/auth');
const { Account } = require('../db');
const router=express.Router();

//get balance
router.get('/balance',authMiddleware,function(req,res){ //auth middleware returns req.userId
    const account=Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;  //taking input in body about the amount and to which person we are sending money

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);  //here in 'to' we are giving the user id of the person to whom we are sending the money

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports=router