import {localhostURL} from './axiosConfig';
import axios, {AxiosResponse} from 'axios';
import {CardDataDTO} from '../models/models';


const postfix = 'stripe/';

const apiURL = localhostURL + postfix;


const cardEndpoints = {
    addcard: 'addcard',
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