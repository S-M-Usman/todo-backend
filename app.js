import express from "express";
import { PORT } from './config/env.js';
import cors from "cors";
import AuthRouter from "./routes/auth.routes.js";
import TodoRouter from "./routes/todo.routes.js";
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middlewares.js'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/users" , AuthRouter);
app.use("/api/v1/todos", TodoRouter);
app.get ("/", (req, res) => {
    res.send("Server started!");
})
app.use(errorMiddleware);
app.use((err,req,res,next)=>{
    const StatusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(StatusCode).send({message:message});
})

app.listen(PORT, async () => {
    console.log(`Todo App API is running on http://localhost:${PORT}`);

    await connectToDatabase();
})
