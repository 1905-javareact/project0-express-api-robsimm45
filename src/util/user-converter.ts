import { User } from "../models/user";
import { UserDto } from "../dto/user.dto";

export function sqlUsertojsUSer(sqluser:UserDto):User{

    return new User(sqluser.users_id, sqluser.username, sqluser.user_password, sqluser.firstname, sqluser.lastname, sqluser.email)
}