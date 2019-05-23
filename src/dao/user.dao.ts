import { connectionPool } from '.';
import { sqlUsertojsUSer } from '../util/user-converter';
import { PoolClient } from 'pg';
import { sqlRoletojsRole } from '../util/role-converter';
import { User } from '../models/user';

//Find all users
export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = []
        let userResult = []
        let roleResult = []

        let userSelect = await client.query('SELECT * FROM "Proj0".users')
        
        for(let temp of userSelect.rows){
            userResult.push(sqlUsertojsUSer(temp))
        }


        let roleSelect = await client.query('SELECT * FROM "Proj0".roles')        
        for(let temp of roleSelect.rows){
            roleResult.push(sqlRoletojsRole(temp))
        }


        for(let y = 0; y < userResult.length; y++){
            for(let x = 0; x < roleResult.length; x++){
                if(userResult[y].userId === roleResult[x].roleUserID){
                    console.log(`Match! ${userResult[y]} with ${roleResult[x]}`)
                    userResult[y].addRoles(roleResult[x])
                }
            }
        }

        result = userResult

        return result


    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}

export async function UserByID(userId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()

        let result
        let userQuery = await client.query(`SELECT * FROM "Proj0".users WHERE users_id = $1`, [userId])
        let roleQuery = await client.query(`SELECT * FROM "Proj0".roles WHERE user_roles_id = $1`, [userId])

        let fullUser = sqlUsertojsUSer(userQuery.rows[0])
        let fullRole = [] 

        for(let x of roleQuery.rows){
            fullRole.push(sqlRoletojsRole(x))
        }

        for(let j = 0; j < fullRole.length; j++){
            if(fullUser.userId === fullRole[j].roleUserID){
                fullUser.addRoles(fullRole[j])
            }
        }

        result = fullUser
        return result
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}

export async function updateUser(newUser:User){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        
        await client.query('BEGIN')
        await client.query(`UPDATE "Proj0".users SET username = $1, user_password = $2, firstname = $3, lastname = $4, email = $5 WHERE users_id = $6`, [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId])
        for(let x = 0; x < newUser.role.length; x++){
            await client.query(`UPDATE "Proj0".roles SET user_roles_id = $1, roles_name = $2 WHERE roles_id = $3`, [newUser.role[x].roleUserID, newUser.role[x].roleName, newUser.role[x].roleId])
        }
        
        await client.query('COMMIT')
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        await client.query('ROLLBACK')
    } finally {
        client && client.release()
    }
}

export async function loginUser(username:string, password:string){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let roleResult = []
        let userQuery = 'SELECT * FROM "Proj0".users WHERE username = $1 and user_password = $2'
        let roleQuery = await client.query('SELECT * FROM "Proj0".roles')
        let userQuery2 = await client.query(userQuery, [username, password])
        if(!userQuery2.rows[0]){
            return 'User not found'
        }

        for(let temp of roleQuery.rows){
            roleResult.push(sqlRoletojsRole(temp))
        }
        console.log(roleResult)

        let result:User = sqlUsertojsUSer(userQuery2.rows[0])

        console.log(result)
        

        for(let x of roleResult){
            if(result.userId === x.roleUserID){
                result.addRoles(x)
            }
            
        }
        return result

    }catch(err){
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}