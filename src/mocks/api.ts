import {LoginData} from '../store/auth/types';
import {CardDataDTO} from '../models/models';
import {mockedCard} from './stubs/card';

let callCount = 0;

export const login = async ():Promise<Partial<LoginData>> => {
    return await new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                amministratore: {
                    id: 1,
                    nome: 'nome',
                    cognome: 'test',
                    username: 'nome.test',
                    idHotel: 1,
                },
                adminToken: 'tokenprova'
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
                userToken: 'tokenprova'
            })
        }, 2000)
    })
}

export const mockedSearchCard = async (userId: number) : Promise<CardDataDTO | undefined> => {
    if(callCount == 0) {
        callCount++;
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockedCard)
            }, 2000)
        })
    }
    return await new Promise((resolve) => {
        callCount = 0;
        setTimeout(() => {
            resolve(undefined)
        }, 2000)
    })
}

export const mockedDeleteCard = async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, 2000)
    })
    /*return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, 2000)
    })*/
}

export const mockedAddCard = async (card: Partial<CardDataDTO>): Promise<CardDataDTO> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockedCard)
        }, 2000)
    })
    /*return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, 2000)
    })*/
}