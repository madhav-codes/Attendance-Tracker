const mongoose=require("mongoose")


const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then(res=>{console.log("Database Connected")}).catch(e=>{console.log("error")})
}


module.exports=connectDB