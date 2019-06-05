import { Request, Response } from "express";

export function corsfilter(req:Request, res:Response, next){
    res.header('Access-Control-Allow-Orgin', `${req.headers.origin}`)
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
}