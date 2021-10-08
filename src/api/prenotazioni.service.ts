import {localhostURL} from './axiosConfig';
import {CategoriaDTO, FatturaDTO, PrenotazioneDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';

const postfix = 'prenotazione/';

const apiURL = localhostURL + postfix;
const prenotazioniEndpoints = {
    lista: 'lista',
    create: 'create'
}

export const searchPrenotazioni = async (idHotel: number): Promise<AxiosResponse<FatturaDTO[]>> => {
    return axios.get(apiURL+prenotazioniEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const createPrenotazione = async (categoria: Partial<PrenotazioneDTO>): Promise<AxiosResponse<PrenotazioneDTO>> => {
    return axios.post(apiURL + prenotazioniEndpoints.create, {
        ...categoria
    })
}