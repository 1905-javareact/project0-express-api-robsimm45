import { User } from "./user";
import { ReimbursementStatus } from "./ReimbursementStatus";
import { ReimbursementType } from "./ReimbursementType";

export class Reimbursement{
    reimbursementId: number // primary key
    author: string  // foreign key -> User, not null
    amount: number  // not null
    dateSubmitted: number // not null
    dateResolved: number // not null
    description: string // not null
    resolver: string // foreign key -> User
    status: string // foreign key -> ReimbursementStatus, not null
    type: string // foreign key -> ReimbursementType


    addAuthor(user:User){
      this.author = user.firstName + ' ' + user.lastName
    }

    addResolver(user:User){
      this.resolver = user.firstName + ' ' + user.lastName
    }

    addStatus(status:ReimbursementStatus){
      this.status = status.status
    }

    addType(type:ReimbursementType){
      this.type = type.type
    }

    constructor(reimId:number, amount, dateSubmitted, dateResolved, description, resolver){
      this.reimbursementId = reimId
      this.amount = amount
      this.dateSubmitted = dateSubmitted
      this.dateResolved = dateResolved
      this.description = description
      this.resolver = resolver
    }

  }