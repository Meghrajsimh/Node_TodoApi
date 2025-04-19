import express from "express";
import connectDb from "./database/database.js";
import {config} from "dotenv";
import router from "./routes/userRoute.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors';

const app = express();

config({
    path: "./database/config.env"
});



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods:['GET','POST',"PUT","DELETE"],
    credentials: true
}))

app.get("/",(req,res)=> {
    res.send("Done Bro")
})
app.use("/api/v1/user",router);
app.use("/api/v1/task",taskRouter);


app.use(errorMiddleware)

connectDb();

app.listen(process.env.PORT,()=> console.log('listen server....'));
