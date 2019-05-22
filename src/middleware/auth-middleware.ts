export function authorization(authRoles:string[]){
    //the function we return is the middleware
    return (req, res, next) => {
        let isAuth = false
        //make sure user is logged in, otherwise user will be undefined
        if(!req.session.user){
            res.sendStatus(401)
        }

        //make sure user has at least one role in authroles
        for(let userRole of req.session.user.role){
            if(authRoles.includes(userRole.roleName)){
                isAuth = true
            }
        } 

        if(isAuth){
            next()
        } else {
            res.sendStatus(403)
        }

    }
}