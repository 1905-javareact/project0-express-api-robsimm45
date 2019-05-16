import express from 'express'
import { User } from '../models/user'
import { Users } from '../data-holder';

export const userRouter = express.Router();

userRouter.get('', (req,res)=>{
    res.json(Users)
})

