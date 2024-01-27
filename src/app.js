import express, { application } from "express";
import "./database/database.js"
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";


export const app = express(); //activa express
app.use(express.json()) //abilita el uso de json en express. respuesta req.body
app.use(express.static("./src/public"))
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)