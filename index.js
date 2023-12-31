const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const likeRoute = require('./routes/likes')

//database
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected succesfully!")
    }catch(err){
        console.log(err)
    }
}

//middlewares
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors({origin:"https://sparkling-pika-7550d8.netlify.app", credentials:true}))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use("/api/likes", likeRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT, () =>{
    connectDB()
    console.log(`App is running on port ${process.env.PORT}`)
})