import {localhostURL, mockTimeout} from './axiosConfig';
import {CategoriaDTO, FatturaDTO, FilterBean, PrenotazioneDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';

const postfix = 'prenotazione/';

const apiURL = localhostURL + postfix;
const prenotazioniEndpoints = {
    lista: 'lista',
    create: 'create',
    update: 'update',
    delete: 'delete',
    searchNomeCognomeDate: 'searchNomeCognomeDate',
    listaFatture: 'listaFatture'
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

export const
    deletePrenotazione = async (idPrenotazione: number): Promise<AxiosResponse<boolean>> => {
    return axios.delete(apiURL + prenotazioniEndpoints.delete, {
        params: {
            idPrenotazione
        }
    })
}

export const searchFilteredByUtenteAndDate = async (filterBean: FilterBean): Promise<AxiosResponse<FatturaDTO[]>> => {
    return axios.get(apiURL + prenotazioniEndpoints.searchNomeCognomeDate, {
        params: {
            ...filterBean
        }
    })
}

export const searchByCliente = async(idCliente: number): Promise<AxiosResponse<FatturaDTO[]>> => {
    return axios.get(apiURL + prenotazioniEndpoints.listaFatture, {
        params: {
            idCliente
        }
    })
}