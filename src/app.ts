import express, { urlencoded } from "express";
require("dotenv").config()
import cors from "cors"
import serverRouter from "../src/routes/server.router"
import errorHandler from "./middlewares/error.handler";



const app = express();
const port = Number ( process.env.PORT || 5000)

app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/hello", serverRouter)

app.listen(port, '0.0.0.0', ()=>{
    console.log("App running on Port", port)
})

app.use(errorHandler)