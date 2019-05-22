import { Role } from "../models/role";
import { rolesDto } from "../dto/role.dto";

export function sqlRoletojsRole(sqlrole:rolesDto):Role{

    console.log(sqlrole.roles_id, sqlrole.user_roles_id, sqlrole.roles_name)
    return new Role(sqlrole.roles_id, sqlrole.user_roles_id, sqlrole.roles_name)
}