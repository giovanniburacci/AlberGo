import {AdminData} from '../models/login';
import {AmministratoreLogin} from '../store/login/types';

export const login = async (data:AdminData):Promise<Partial<AmministratoreLogin>> => {
    return await new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                idAmministratore: '0',
                nome: 'Pippo',
                cognome: 'Baudo',
                username: 'pippobaudo69',
                email: 'pippo.baudo@hotmail.com',
                idHotel: '0',
                token: 'tokenprova'
            })
        }, 2000)
    })

}