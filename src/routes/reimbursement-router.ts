import express from 'express'
import { authorization } from '../middleware/auth-middleware';
import { statusReimbursement, userReimbursement } from '../dao/reimbursement.dao';
export const reimbursementRouter = express.Router()

//Find Reimbursements By Status
reimbursementRouter.get('/status/:id', [authorization(['finance-manager']), async (req,res) =>{
    const statusId = +req.params.id
    let reimbursement = await statusReimbursement(statusId) 

    if(reimbursement){
        res.json(reimbursement)
    } else {
        res.sendStatus(401)
    }
}])



//Find Reimbursements By User
reimbursementRouter.get('/author/userId/:id', [authorization(['finance-manager']), async (req, res) =>{
    const userId = +req.params.id
    let reimbursement = await userReimbursement(userId)

    if(reimbursement){
        res.json(reimbursement)
    } else {
        res.sendStatus(401)
    }
}])

//Submit Reimbursement
reimbursementRouter.post('/', async (req, res)=>{

})

//update a reimbursement
reimbursementRouter.patch('/', [authorization(['finance-manager']), async (req,res)=>{
    
}])
