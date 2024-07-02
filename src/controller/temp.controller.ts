import axios from 'axios'
import { NextFunction, Request, Response } from 'express';

const getTemperatureFromApi = async (req:Request, res:Response, next:NextFunction) =>{
   
    try {
        const clientIp = req.ip
        const apiKey = process.env.WEATHER_API_KEY; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${clientIp}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const temp: number = response.data.main.temp;

        return temp;
            
    } catch (error) {
        next(error)
        
    }
}

export {getTemperatureFromApi}