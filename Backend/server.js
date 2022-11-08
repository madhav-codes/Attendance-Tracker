const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("./Config/database")
const app=require("./app")

dotenv.config({path:"./Config/.env"})

connectDB()

app.listen(process.env.PORT,()=>{
    console.log("Backend Connected")
    })



