import express, { Request, Response }  from "express"
import { helloServer } from "../controller/server.controller";


const route = express.Router()

route.get("/", helloServer)

export default route;