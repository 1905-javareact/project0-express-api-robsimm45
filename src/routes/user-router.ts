import express from 'express'
import { authorization } from '../middleware/auth-middleware';
import { getAllUsersService, getUserByIDService, loginUserService, updateUserService } from '../service/user.service';


export const userRouter = express.Router();

//Get users
userRouter.get('',[authorization(['finance-manager']), async (req,res)=>{
    res.json(await getAllUsersService())
}])



//lets make a login endpoint
userRouter.post('/login', async (req, res)=>{
    const {username, password} = req.body
    const user = await loginUserService(username, password)

    if(user){
        req.session.user = user
        res.send(req.session)
    } else{
        res.sendStatus(401)
    }
})


//Find User by ID
userRouter.get('/:id', async (req,res)=>{
    let inputId = +req.params.id
    let user = getUserByIDService(inputId, req, res)
    
    if(user){
        res.json(user)
    } else {
        res.sendStatus(403)
    }
})


//Update User 
userRouter.patch('', [authorization(['admin']), async (req,res)=>{
    let { userId } = req.body
    let user = await updateUserService(userId, req.body)

    if(user){
        res.json(req.body)
    } else{
        res.sendStatus(401)
    }
}])
