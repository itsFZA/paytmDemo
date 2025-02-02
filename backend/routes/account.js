const express = require('express');
const { Account, User } = require('../db');
const { authMiddleware } = require('../middleware');
const { mongoose } = require('mongoose');
const router = express.Router();
router.get('/balance', authMiddleware, async (req,res) =>{
    const userid = req.userid;
    console.log(`user id : ${userid}`);
    const {balance} = await Account.findOne({userId:userid})
    res.status(200).json({balance:balance})
})

router.post('/recipientBalance', async(req,res) =>{
    const {recipient} = req.body;
    console.log(`recipient id ${recipient}`);
    const {balance} = await Account.findOne({userId:recipient})
    res.status(200).json({balance:balance})

})

router.post('/transfer', authMiddleware,async(req,res) =>{
    const {transferringTo, amount} = req.body;
    console.log(`request body ${transferringTo} ${amount}`);
    const session =  await mongoose.startSession();
    session.startTransaction();
    try {
        const from = await Account.findOne({userId:req.userid}).session(session)
        console.log(`from : ${from}`);
        if (!from || from.balance < amount){
            res.status(400).json({message:"Insufficient balance"})
        }
        const toAccount = await Account.findOne({userId: transferringTo}).session(session);
        console.log(`to account ${toAccount}`);
        if(!toAccount){
            res.status(400).json({message: "invalid account"})
        }
        await Account.updateOne({userId:req.userid},{$inc: {balance: -amount}}).session(session)
        const to = await Account.findOneAndUpdate({userId:transferringTo},{$inc: {balance: amount}}).session(session)
        console.log(`to : ${to}`);
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    }
    
    res.status(200) .json({message:"Transfer Successful"})
})

module.exports = router