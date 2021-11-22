import {LoginData} from '../store/login/types';
import {CardDataDTO} from '../models/models';

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

export const mockedSearchCard = async (userId: number) : Promise<CardDataDTO> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                cardId: '1',
                number: '424242424242',
                cvc: '908',
                idCliente: 1,
                exp_month: '10',
                exp_year: '2021'
            })
        }, 2000)
    })
}