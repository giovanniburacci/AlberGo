import {AdminData} from '../models/login';
import {LoginData} from '../store/login/types';
import {ClienteDTO} from '../models/models';

export const login = async ():Promise<Partial<LoginData>> => {
    return await new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                amministratore: {
                    id: 0,
                    nome: 'Pippo',
                    cognome: 'Baudo',
                    username: 'pippobaudo69',
                    idHotel: 0,
                },
                token: 'tokenprova'
            })
        }, 2000)
    })
}

export const loginUser = async ():Promise<Partial<LoginData>> => {
    return await new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: 1,
                    nome: 'Fabio',
                    cognome: 'Orazi',
                    telefono: '3294502297',
                    documento: 'AB1234PROVA',
                    username: 'fabio.orazi'
                },
                token: 'tokenprova'
            })
        }, 2000)
    })
}