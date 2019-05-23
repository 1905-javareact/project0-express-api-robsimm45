
export class ReimbursementStatus{
    statusId: number // primary key
    status: string // not null, unique

    constructor(statusId:number, status_name:string){
      this.statusId = statusId
      this.status = status_name
    }
  }