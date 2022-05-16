import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import 'dotenv/config';

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/user",router); //http://localhost:5000/api/user
app.use("/api/blog" , blogRouter);


mongoose.connect('mongodb+srv://admin:admin123@cluster0.z1gfe.mongodb.net/Blog?retryWrites=true&w=majority'
).then(()=>app.listen(process.env.PORT || 5000))
.then(()=>console.log("Conneted To the Database and listing To Localhost to 5000")
).catch((err)=>console.log(err));


app.use("/api" , (req,res,next)=>{
    res.send("Hello World")
});

