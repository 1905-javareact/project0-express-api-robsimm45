import { getAllUsers, UserByID, loginUser, updateUser } from "../dao/user.dao";


export async function getAllUsersService(){
    return await getAllUsers()
}

export async function getUserByIDService(inputId, req, res){
    let user
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
    
    return user
}   


export async function loginUserService(username, password){
    return await loginUser(username, password)
}

export async function updateUserService(userId, body){
    if (await UserByID(userId)){
        return await updateUser(await UserByID(userId))
    } else {
        return null
    }
}