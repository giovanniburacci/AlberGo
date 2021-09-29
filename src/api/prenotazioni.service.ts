import {localhostURL} from './axiosConfig';
import {PrenotazioneIbridaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';

const postfix = 'prenotazione/';

const apiURL = localhostURL + postfix;
const prenotazioniEndpoints = {
    lista:'lista'
}

export const searchPrenotazioni = async (idHotel: number): Promise<AxiosResponse<PrenotazioneIbridaDTO[]>> => {
    return axios.get(apiURL+prenotazioniEndpoints.lista,{
        params: {
            idHotel
        }
    });
}