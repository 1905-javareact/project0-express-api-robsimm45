
export class Role{
    roleId: number // primary key
    roleUserID: number
    roleName: string // not null, unique
    
    constructor(roleId:number = 0, roleUserID?: number, roleName:string = ''){
      this.roleId = roleId
      this.roleUserID = roleUserID
      this.roleName = roleName
    }
  }