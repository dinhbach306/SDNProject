import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute";
dotenv.config();

const app: Express = express();
const contextPath: string = process.env.CONTEXT_PATH!;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(contextPath, userRouter);

export default app;
