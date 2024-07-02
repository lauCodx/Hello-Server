import { NextFunction, Request, Response } from "express";
import geoip from 'geoip-lite'
import { getTemperatureFromApi } from "./temp.controller";



// @desc Hello Server
// @route GET  /api/hello
// access public
const helloServer = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const visitorName = req.query.visitor_name
        const clientIp = req.ip;
        
        if (clientIp){
            const geo: string | any = geoip.lookup(clientIp)
            const city = geo.city
            const location = geo && geo.city ? city : "Error getting city name"
            const temperature = await getTemperatureFromApi(req, res, next)

            res.status(200).json({
                client_ip: clientIp,
                location,
                greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degree Celcius in ${location}`
            })
        } else{
            res.status(400);
            throw new Error ("Invalid IP address!")
        }
        
    } catch (err) {
       next(err)
    }


}

export {helloServer}