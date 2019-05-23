
export class ReimbursementType{
    typeId: number // primary key
    type: string // not null, unique

    constructor(typeId:number, type_name:string){
        this.typeId = typeId
        this.type = type_name
    }
  }