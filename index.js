
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import dbConnection from './db/db.js'
import User from './models/user.js'
import bycrypt from 'bcryptjs'



dbConnection()

const app = express()
app.use(express.json()); 
app.use(cors())

const PORT = process.env.PORT ;


app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashpassword = await bycrypt.hash(password, 10);
    // bycript.compare(password, hashpassword, function(err, res) {
    //     if (err) {
    //         console.error("Error comparing passwords:", err);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Error comparing passwords",
    //             error: err.message
    //         });
    //     }
    //     console.log("Password comparison result:", res); 
    // });

    const user = await User.create({
      name,
      email,
      password : hashpassword
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


// curd 
// post ,get , update , delete



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




app.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});


app.delete("/users", async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});


app.put("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;
        const hashpassword = await bycrypt.hash(password, 10);

        

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, password: hashpassword },
            { returnDocument: "after" }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
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