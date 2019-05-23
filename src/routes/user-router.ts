import express from 'express'
import { authorization } from '../middleware/auth-middleware';
import { getAllUsers, UserByID, updateUser } from '../dao/user.dao';
import { loginUser } from '../dao/login.dao';


export const userRouter = express.Router();

//Get users
userRouter.get('',[authorization(['finance-manager']), async (req,res)=>{
    res.json(await getAllUsers())
}])



//lets make a login endpoint
userRouter.post('/login', async (req, res)=>{
    const {username, password} = req.body
    const user = await loginUser(username, password)

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
    let user = null
    let authRoles = ['finance-manager']

    let isAuth = false

    if(!req.session.user){
        res.sendStatus(401)
    }

    for(let userRole of req.session.user.role){
        if(authRoles.includes(userRole.roleName)){
            isAuth = true
        }
    } 

    if(isAuth){
        user = await UserByID(inputId)
    } else if(inputId === req.session.user.userId){ 
        user = await UserByID(req.session.user.userId)
    } else{
        user = null
    }

    
    if(user){
        res.json(user)
    } else {
        res.sendStatus(403)
    }
})


//Update User 
userRouter.patch('', [authorization(['admin']), async (req,res)=>{
    let { userId } = req.body
    let user = await UserByID(userId)

    if(user){
        await updateUser(req.body)
        res.json(req.body)
    } else{
        res.sendStatus(401)
    }
}])
