import axios from 'axios'
import { NextFunction, Request, Response } from 'express';
import geoip from "geoip-lite"
const getTemperatureFromApi = async (req:Request, res:Response, next:NextFunction) =>{
   
    try {
       const clientIp = req.ip;

       if (!clientIp){
        res.status(400);
        throw new Error ("Error identifying the IP address!")
       };

       const geo = geoip.lookup(clientIp)

       if (!geo || !geo.city){
        res.status(400);
        throw new Error ("Unable to determine city by IP")
       }
       
       const city = geo.city;
       const apiKey = process.env.WEATHER_API_KEY; 
       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

       const response = await axios.get(apiUrl);
       const temp: number = response.data.main.temp;

       return temp;
            
    } catch (error) {
        next(error)
        
    }
}

export {getTemperatureFromApi}