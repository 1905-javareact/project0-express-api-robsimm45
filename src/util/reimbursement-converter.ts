import { reimDto } from "../dto/reimbursement.dto";
import { Reimbursement } from "../models/Reimbursement";
import { statusDto } from "../dto/status.dto";
import { retypesDto } from "../dto/retypes.dto";
import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { ReimbursementType } from "../models/ReimbursementType";

export function sqlReimtojsReim(reimburs:reimDto){

    let datesSub = new Date(reimburs.date_submitted)
    let datesRes = new Date(reimburs.date_resolved)

    return new Reimbursement(reimburs.reimbursement_id,reimburs.amount,datesSub,datesRes,reimburs.description,reimburs.resolver)
}

export function sqlStatustojsStatus(stats:statusDto){
    return new ReimbursementStatus(stats.status_id, stats.status_name)
}

export function sqlTypestojsTypes(types:retypesDto){
    return new ReimbursementType(types.retypes_id, types.retypes_name)
}