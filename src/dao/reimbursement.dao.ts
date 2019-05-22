import { connectionPool } from '.';
import { PoolClient } from 'pg';

//Find reimbursement by status
export async function statusReimbursement(statusId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = []
        let reimResult = []
        let statusResult = []
        let typesResult = []

        let reimSelect = await client.query('SELECT * FROM "Proj0".reimbursement, ')



        return result


    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}
