import { connectionPool } from '.';
import { sqlUsertojsUSer } from '../util/user-converter';
import { PoolClient } from 'pg';
import { sqlRoletojsRole } from '../util/role-converter';
import { User } from '../models/user';

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