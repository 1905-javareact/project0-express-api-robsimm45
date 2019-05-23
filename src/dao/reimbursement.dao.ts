import { connectionPool } from '.';
import { PoolClient } from 'pg';
import { sqlReimtojsReim, sqlTypestojsTypes, sqlStatustojsStatus } from '../util/reimbursement-converter';
import { sqlUsertojsUSer } from '../util/user-converter';

//Find reimbursement by status
export async function statusReimbursement(statusId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = []
        let reimResult = []
        let userResult = []
        let typesResult = []
        let statusResult

        //use queries to get all the reimbursements needed, the name of the status and all the types
        let reimSelect = await client.query('SELECT * FROM "Proj0".reimbursement WHERE status = $1', [statusId])
        let statusSelect = await client.query('SELECT * FROM "Proj0".status WHERE status_id = $1', [statusId])
        let userSelect = await client.query('SELECT * FROM "Proj0".users')
        let typesSelect = await client.query('SELECT * FROM "Proj0".retypes')

        //turning the reimbursement dto's into an array of reimbursement objects
        for(let x of reimSelect.rows){
            reimResult.push(sqlReimtojsReim(x))
        }

        //turning user dto's into array of users
        for(let x of userSelect.rows){
            userResult.push(sqlUsertojsUSer(x))
        }

        //Turning all the types into type objects
        for(let x of typesSelect.rows){
            typesResult.push(sqlTypestojsTypes(x))
        }

        console.log(typesResult)

        //turning all status into status objects
        //Turning all the types into type objects
        for(let x of statusSelect.rows){
            statusResult = sqlStatustojsStatus(x)
        }


        
        //Adding the author name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < userResult.length; y++){
                if(reimSelect.rows[x].author_id === userResult[y].userId){
                    reimResult[x].addAuthor(userResult[y])
                }
            }
        }
        
        //Adding resolver name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < userResult.length; y++){
                if(reimSelect.rows[x].resolver === userResult[y].userId){
                    reimResult[x].addResolver(userResult[y])
                }
            }
        }

        //Adding type name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < typesResult.length; y++){
                if(reimSelect.rows[x].re_types == typesResult[y].typeId){
                    reimResult[x].addType(typesResult[y])
                }
            }
        }

        //Adding the status names
        for(let x of reimResult){
            x.addStatus(statusResult)
        }
     
        result = reimResult
        return result

    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}


//find reimbursement by user id
export async function userReimbursement(userId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = []
        let reimResult = []
        let userResult = []
        let typesResult = []
        let statusResult = []

        //use queries to get all the reimbursements needed, the name of the status and all the types
        let reimSelect = await client.query('SELECT * FROM "Proj0".reimbursement WHERE author_id = $1', [userId])
        let statusSelect = await client.query('SELECT * FROM "Proj0".status')
        let userSelect = await client.query('SELECT * FROM "Proj0".users')
        let typesSelect = await client.query('SELECT * FROM "Proj0".retypes')

        //turning the reimbursement dto's into an array of reimbursement objects
        for(let x of reimSelect.rows){
            reimResult.push(sqlReimtojsReim(x))
        }

        //turning user dto's into array of users
        for(let x of userSelect.rows){
            userResult.push(sqlUsertojsUSer(x))
        }

        //Turning all the types into type objects
        for(let x of typesSelect.rows){
            typesResult.push(sqlTypestojsTypes(x))
        }


        //turning all status into status objects
        //Turning all the types into type objects
        for(let x of statusSelect.rows){
            statusResult.push(sqlStatustojsStatus(x))
        }


        
        //Adding the author name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < userResult.length; y++){
                if(reimSelect.rows[x].author_id === userResult[y].userId){
                    reimResult[x].addAuthor(userResult[y])
                }
            }
        }
        
        //Adding resolver name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < userResult.length; y++){
                if(reimSelect.rows[x].resolver === userResult[y].userId){
                    reimResult[x].addResolver(userResult[y])
                }
            }
        }

        //Adding type name
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < typesResult.length; y++){
                if(reimSelect.rows[x].re_types == typesResult[y].typeId){
                    reimResult[x].addType(typesResult[y])
                }
            }
        }

        //Adding the status names
        for(let x = 0; x < reimResult.length; x++){
            for(let y = 0; y < statusResult.length; y++){
                if(reimSelect.rows[x].status_id == statusResult[y].statusId){
                    reimResult[x].addType(statusResult[y])
                }
            }
        }
     
        result = reimResult
        return result

    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}

