const express = require('express');
const userRouter = express.Router();
const zod = require('zod')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config')
const {User, Account} = require('../db');
const { authMiddleware } = require('../middleware');

const signUpBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

userRouter.post('/signup',async (req,res) =>{
    try {
        const {username, firstname, lastname, password} = req.body
        const {success} = signUpBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({message: "Email already taken/Incorrect inputs"})
        }
        console.log(`username: ${username}`);
        const userExists =  await User.findOne({username:username})
        console.log(`user exists: ${userExists}`);
        if (userExists) {
            return res.status(411).json({message:"User already exists"})
        }
        if(!userExists){
            const balance  = (Math.random()*10000)
            console.log(`calculate ${balance}`);
            const newUser = await User.create({username, firstname, lastname, password})
            const newUserId = newUser._id;
            const updateBalance = await Account.create({userId:newUserId,balance: balance})
            console.log(`balance : ${updateBalance}`);
            console.log(`new user : ${newUser}`);
            console.log(`secret : ${jwt_secret}`);
    
            const token = jwt.sign({newUserId},jwt_secret)
            console.log(`token : ${token}`);
    
            return res.json({
                message:"User created successfully",
                token:token
            })
        }
    } catch (error) {
        console.log("Error occured while signing up "  + error);
        return res.status(500).json({message: "Error while signing up"})
    }


})

userRouter.post('/signin', async(req,res) =>{
    try {
        const {username,password} = req.body;
        const signInBody = zod.object({ username:zod.string().email(), password: zod.string() });
        const {success} = signInBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({message:"Incorrect inputs"})
        } 
        console.log(`username : ${username} password : ${password}`);
        const userExists = await User.findOne({username:username,password: password})
        console.log(` user available: ${userExists}`);
        if(userExists){
            const token = jwt.sign({userid: userExists._id}, jwt_secret) 
            return res.json({message: "User signIn successful",
                token:token
            })
        }else{
            return res.status(411).json({message:"Error while logging in"})
        }
        
    } catch (error) {
        console.log("Error during sign in: " +error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

userRouter.put('/', authMiddleware, async(req,res) =>{
    const updateBody = zod.object({    
        firstname: zod.string().optional(),
        lastname: zod.string().optional(),
        password: zod.string().optional()
    })
    
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({message: "Error while updating"})
    }
    console.log("hi");
    await User.updateOne({ _id:req.userid}, req.body)
    res.status(204)
})

userRouter.get('/bulk', async(req,res) =>{
    const filterBy = req.query.filterBy
    let foundUser; 
    if(filterBy){
        foundUser = await User.find({firstname:filterBy})
    }else{
        foundUser = await User.find({})
    }

    if(foundUser){
        res.status(200).json({users:foundUser})
    }
    else{
        res.status(404).json({message:"Not found"})
    }
    
    

})
module.exports = userRouter;