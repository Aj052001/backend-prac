
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import dbConnection from './db/db.js'
import User from './models/user.js'


dbConnection()

const app = express()
app.use(express.json()); 
app.use(cors())

const PORT = process.env.PORT ;


app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add user",
      error: error.message
    });
  }
});


app.get("/users", async (req, res) => { 
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message
        });
    }
});





app.get("/testing",(req,res)=>{
    res.send("server is start")
})










app.listen(PORT,()=>{
    console.log("server is start")
})