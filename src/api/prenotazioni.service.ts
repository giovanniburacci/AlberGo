import {localhostURL} from './axiosConfig';
import {CategoriaDTO, FatturaDTO, PrenotazioneDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';

const postfix = 'prenotazione/';

const apiURL = localhostURL + postfix;
const prenotazioniEndpoints = {
    lista: 'lista',
    create: 'create',
    update: 'update'
}

export const searchPrenotazioni = async (idHotel: number): Promise<AxiosResponse<FatturaDTO[]>> => {
    return axios.get(apiURL+prenotazioniEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const createPrenotazione = async (prenotazione: Partial<PrenotazioneDTO>): Promise<AxiosResponse<PrenotazioneDTO>> => {
    return axios.post(apiURL + prenotazioniEndpoints.create, {
        ...prenotazione
    })
}

export const updatePrenotazione = async (prenotazione: Partial<PrenotazioneDTO>): Promise<AxiosResponse<PrenotazioneDTO>> => {
    return axios.put(apiURL + prenotazioniEndpoints.update, {
        ...prenotazione
    })
}