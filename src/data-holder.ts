import {User} from './models/user'
//import { Role } from './models/role';

export const Users:User[] = [
    new User( 53, 'CobyW', 'ShouldntBeSoHard','Coby','Wiliams','Willaims.Coby@noneyabuisness.com',[{roleId: 682459, roleUserID: 53,roleName: 'finance-manager'}]),
    new User(23,'ZCathra','ImSoTired','Zuzanna','Cathra','Cathra.Zuzanna@noneyabuisness.com',[{roleId: 3243125,roleUserID: 23,roleName: 'Customer'}]),
    new User(72,'GPhilips','DaysAreSoLong','Gertured', 'Philips', 'Getard@noneyabuisness.com', [{roleId: 32424,roleUserID: 72,roleName: 'Customer'}]), 
    new User(24,'JJJamerson','HowAmIStillGoing?','Jeremia','James','James.Jeremia@noneyabuisness.com',[{roleId: 49332,roleUserID: 24,roleName: 'Customer'}]), 
    new User(502,'BMansly','SadlyIDontKnow','Bertha','Mansly', 'Mansly.Bertha@noneyabuisness.com', [{roleId: 121,roleUserID: 502,roleName: 'admin'}])
]