import { findReimByID, updateReim, inputReim } from "../dao/reimbursement.dao";
import { Reimbursement } from "../models/Reimbursement";

export async function updateReimService(reimId:number, request){
    if(await findReimByID(reimId)){
        let newReim = await findReimByID(reimId)
        let {body} = request

        for(let x in body){
            if(!body[x]){

            } else {
                newReim[x] = body[x]
            }
        }

        return await updateReim(newReim)
    } else {
        return null
    }
}

export async function newReimService(body){
    let temp= new Reimbursement(0, 0, '2019-08-04', '2019-12-05', '', '')
    
    if(body){
        for(let x in body){
            if(!body[x]){
                return null
            }else{
                temp[x] = body[x]
            }
        }

        temp.reimbursementId = 0

        return await inputReim(temp)
    } else{
        return null
    }
}