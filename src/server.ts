// const express = require("express")
import express from 'express'
import router from './router'
import morgan from 'morgan'
import {protect} from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

// const customLogger = (message)=> (req, res, next)=>{
//     console.log(`Hello from ${message}`)
//     next()
// }

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(customLogger("Santan Joe"))

// app.use((req, res, next)=>{
//     res.status(401)
//     res.send("Nope!")
// })

app.get('/', (req,res)=>{
    res.json({message: "hello"})
})

app.use('/api', protect, router);
app.use('/user', createNewUser)
app.use('/signin', signIn)

app.use((err, req, res, next)=> {
    if(err.type === "auth"){
        res.status(401).json({message: 'unauthorized'})
    }else if(err.type === "input"){
        res.status(400).json({message:'invalid input'})
    }else{
        res.status(500).json({message: "Opppsss, that's on us!"})
    }
})

// module.exports = app;
export default app;