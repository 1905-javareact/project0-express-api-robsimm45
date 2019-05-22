import express from 'express'
import { loginUser } from '../dao/login.dao';

export const loginRouter = express.Router();

//lets make a login endpoint
loginRouter.post('', async (req, res)=>{
    const {username, password} = req.body
    const user = await loginUser(username, password)

    if(user){
        req.session.user = user
        res.send(req.session)// don't send them the session
        //we send them their user object
    } else{
        res.sendStatus(401)
    }
})
