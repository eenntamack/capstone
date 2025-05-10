import {user} from "../schemas/user.js"
import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Define User model
const User = mongoose.models.user || mongoose.model('user', user)

router.route("/login").get((req,res)=>{
    const profile = new User({
        username:"John",
        password:"pass"
    })
    profile.save()
    res.json({user:profile})
})

export {router}