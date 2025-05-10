import mongoose from 'mongoose'
import express from 'express'

const router = express.Router()


export const user =  new mongoose.Schema({
    username : {type: String, required: true},
    password: {type: String, required: true},
    logHistory : {type: Date, default: Date.now()},
    mode: {type: String, default:"light"}
     
})

router.route("/")
.get(async (req,res)=>{
    const Users = mongoose.models.user || mongoose.model('user', user);
    const users = await Users.find()
    res.json(users)
})

export{router}