import express from 'express'
import { authorization } from '../middleware/auth-middleware';
import {Reimbursement} from '../models/Reimbursement'

/*import {ReimbursementStatus} from '../models/ReimbursementStatus'
import {ReimbursementType} from '../models/ReimbursementType'
*/
export const reimbursementRouter = express.Router()

//Find Reimbursements By Status
reimbursementRouter.get('/status/:id', [authorization['finance-manager'], async (req,res) =>{
    const {statusId} = req.body
    const reimbursement = await statusReimbursment(statusId) 

    if(reimbursement){
        res.json(reimbursement)
    } else {
        res.sendStatus(401)
    }
}])

//Find Reimbursements By User
reimbursementRouter.get('/author/userId/:id')

//Submit Reimbursement
reimbursementRouter.post('')
