import { Request, Response } from "express";

export function corsfilter(req:Request, res:Response, next){
    res.header('Acces-Control-Allow-Orgin', 'file:///C:/Users/Simmo/project0-express-api-robsimm45/src/html/index.html?')
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept')
    res.header('Acces-Control-Allow-Credentials', 'true')
    next();
}