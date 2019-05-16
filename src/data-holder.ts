import {User} from './models/user'
import { Role } from './models/role';

export const Users:User[] = [
    {
        userId: 53,
	    username: 'CobyW', 
	    password: 'ShouldntBeSoHard',
	    firstName: 'Coby', 
	    lastName: 'Wiliams', 
	    email: 'Willaims.Coby@noneyabuisness.com', // not null
        role: {
            roleId: 682459,
            roleName: 'Customer'
        }
    },{
        userId: 23,
        username: 'ZCathra',
        password: 'ImSoTired',
        firstName: 'Zuzanna', 
        lastName: 'Cathra', 
        email: 'Cathra.Zuzanna@noneyabuisness.com', // not null
        role: {
            roleId: 3243125,
            roleName: 'Customer'
        }
    },{
        userId: 72,
	    username: 'GPhilips',
	    password: 'DaysAreSoLong',
	    firstName: 'Gertured', 
	    lastName: 'Philips', 
        email: 'Pilips, Getard@noneyabuisness.com', 
	    role: {
            roleId: 32424,
            roleName: 'Customer'
        }
    }, {
        userId: 24,
	    username: 'JJJamerson',
	    password: 'HowAmIStillGoing?',
	    firstName: 'Jeremia',
	    lastName: 'James',
        email: 'James.Jeremia@noneyabuisness.com',
	    role: {
            roleId: 49332,
            roleName: 'Customer' // not null
        }
    }, {
        userId: 502,
	    username: 'BMasnly',
	    password: 'SadlyIDontKnow',
	    firstName: 'Bertha',
	    lastName: 'Mansly', 
        email: 'Mansly.Bertha@noneyabuisness.com', 
	    role: {
            roleId: 121,
            roleName: 'Customer'
        } // not null
    }
]