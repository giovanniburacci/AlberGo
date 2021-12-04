import {localhostURL} from './axiosConfig';
import axios, {AxiosResponse} from 'axios';
import {CardDataDTO} from '../models/models';


const postfix = 'stripe/';

const apiURL = localhostURL + postfix;


const cardEndpoints = {
    addCard: 'addCard',
    dettaglioCard: 'dettaglioCard',
    deleteCard: 'deleteCard'
}

export const searchCard = async (idCliente: number): Promise<AxiosResponse<CardDataDTO>> => {
    return axios.get(apiURL+cardEndpoints.dettaglioCard,{
        params: {
            idCliente
        }
    });
}

export const createCard = async (card: Partial<CardDataDTO>): Promise<AxiosResponse<void>> => {
    return axios.post(apiURL+cardEndpoints.addCard,{
            ...card
    });
}

export const deleteCard = async (idCliente: number): Promise<AxiosResponse<void>> => {
    return axios.delete(apiURL+cardEndpoints.deleteCard,{
        params: {
            idCliente
        }
    });
}