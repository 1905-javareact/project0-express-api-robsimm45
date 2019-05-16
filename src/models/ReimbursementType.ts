
export class ReimbursementType{
    typeId: number // primary key
    type: string // not null, unique

    correctStatus(type:string){
        if(type === 'Pending' || type === 'Approved' || type === 'Denied'){
            
        }else{
            
        }

    }
  }