import { connectionPool } from '.';
import { PoolClient } from 'pg';
import { sqlReimtojsReim, sqlTypestojsTypes, sqlStatustojsStatus } from '../util/reimbursement-converter';
import { sqlUsertojsUSer } from '../util/user-converter';
import { Reimbursement } from '../models/Reimbursement';

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

export async function findReimByID(reimID:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result
        let reimResult = []
        let userResult = []
        let typesResult = []
        let statusResult = []

        //use queries to get all the reimbursements needed, the name of the status and all the types
        let reimSelect = await client.query('SELECT * FROM "Proj0".reimbursement WHERE reimbursement_id = $1', [reimID])
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
        
        result = reimResult[0]

        if(!result){
            return null
        } else {
            return result
        }

    }catch(err){
        console.log(err); 
        return null
    } finally{
        client && client.release()
    }
}


export async function updateReim(reim:Reimbursement){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = reim

        let tempStatus = ()=>{
            if(result.status === 'Pending'){
                return 1
            } else if(result.status === 'Approved'){
                return 2
            }else {
                return 3
            }
        }

        let tempType = () =>{
            if(result.type === 'Lodging'){
                return 1
            } else if(result.type === 'Travel'){
                return 2
            } else if(result.type === 'Food'){
                return 3
            }else{
                return 4
            }
        }


        //For resolver and author, got to be a bit more fancy
        let userSelect = await client.query('SELECT * FROM "Proj0".users')

        console.log(userSelect.rows)

        let tempAuthor = () =>{
            for(let x = 0; x < userSelect.rows.length; x++){
                console.log('This person name is: ' + userSelect.rows[x].firstname + ' ' + userSelect.rows[x].lastname)
                if(reim.author == (userSelect.rows[x].firstname + ' ' +userSelect.rows[x].lastname)){
                    return userSelect.rows[x].users_id
                }
            }
        }

        let tempRevolver = () =>{
            for(let x = 0; x < userSelect.rows.length; x++){
                if(reim.resolver == (userSelect.rows[x].firstname + ' ' +userSelect.rows[x].lastname)){
                    console.log('got it!')
                    return userSelect.rows[x].users_id
                }
            }
        }
        
        await client.query('BEGIN')
        await client.query('UPDATE "Proj0".reimbursement SET author_id = $1, amount = $2, date_submitted = $3, date_resolved = $4, description = $5, resolver = $6, status = $7, re_types = $8 WHERE reimbursement_id = $9', [tempAuthor(), reim.amount, reim.dateSubmitted,reim.dateResolved,reim.description,tempRevolver(), tempStatus(), tempType(), reim.reimbursementId])
        await client.query('COMMIT')

        return result
    }catch(err){
        console.log(err); 
        await client.query('ROLLBACK')
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}




export async function inputReim(reim:Reimbursement){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = reim

        let tempStatus = ()=>{
            if(result.status === 'Pending'){
                return 1
            } else if(result.status === 'Approved'){
                return 2
            }else {
                return 3
            }
        }

        let tempType = () =>{
            if(result.type === 'Lodging'){
                return 1
            } else if(result.type === 'Travel'){
                return 2
            } else if(result.type === 'Food'){
                return 3
            }else{
                return 4
            }
        }


        //For resolver and author, got to be a bit more fancy
        let userSelect = await client.query('SELECT * FROM "Proj0".users')

        console.log(userSelect.rows)

        let tempAuthor = () =>{
            for(let x = 0; x < userSelect.rows.length; x++){
                console.log('This person name is: ' + userSelect.rows[x].firstname + ' ' + userSelect.rows[x].lastname)
                if(reim.author == (userSelect.rows[x].firstname + ' ' +userSelect.rows[x].lastname)){
                    return userSelect.rows[x].users_id
                }
            }
        }

        let tempRevolver = () =>{
            for(let x = 0; x < userSelect.rows.length; x++){
                if(reim.resolver == (userSelect.rows[x].firstname + ' ' +userSelect.rows[x].lastname)){
                    console.log('got it!')
                    return userSelect.rows[x].users_id
                }
            }
        }
        
        await client.query('BEGIN')
        await client.query('INSERT INTO "Proj0".reimbursement(author_id, amount, date_submitted, date_resolved, description, resolver, status, re_types) values ($1,$2,$3,$4,$5,$6,$7,$8)', [tempAuthor(), reim.amount, reim.dateSubmitted,reim.dateResolved,reim.description,tempRevolver(), tempStatus(), tempType()])
        await client.query('COMMIT')

        return result
    }catch(err){
        console.log(err); 
        await client.query('ROLLBACK')
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}