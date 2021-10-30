import {localhostURL} from './axiosConfig';
import {StanzaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';
import {FetchWithDatesBean} from '../store/stanze/stanze.action';


const postfix = 'stanza/';

const apiURL = localhostURL + postfix;


const stanzaEndpoints = {
    lista: 'lista',
    create: 'create',
    libere: 'libere',
    occupate: 'occupate',
    update: 'update',
    delete: 'delete'
}

export const searchStanze = async (idHotel: number): Promise<AxiosResponse<StanzaDTO[]>> => {
    return axios.get(apiURL+stanzaEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const searchStanzeLibereWithDates = async (params: FetchWithDatesBean): Promise<AxiosResponse<StanzaDTO[]>> => {
    let {idHotel, dataInizio, dataFine} = params
    const newDataInizio = dataInizio.toDate();
    const newDataFine = dataFine.toDate()
    return axios.get(apiURL+stanzaEndpoints.libere,{
        params: {
            idHotel,
            dataInizio: newDataInizio,
            dataFine: newDataFine
        }
    });
}

export const searchStanzeOccupateWithDates = async (params: FetchWithDatesBean): Promise<AxiosResponse<StanzaDTO[]>> => {
    let {idHotel, dataInizio, dataFine} = params
    const newDataInizio = dataInizio.toDate();
    const newDataFine = dataFine.toDate()
    return axios.get(apiURL+stanzaEndpoints.occupate,{
        params: {
            idHotel,
            dataInizio: newDataInizio,
            dataFine: newDataFine
        }
    });
}

export const createStanza = async (stanza: Partial<StanzaDTO>): Promise<AxiosResponse<StanzaDTO>> => {
    return axios.post(apiURL+stanzaEndpoints.create,{
        ...stanza
    });
}

export const updateStanza = async (stanza: StanzaDTO): Promise<AxiosResponse<StanzaDTO>> => {
    return axios.put(apiURL+stanzaEndpoints.update,{
        ...stanza
    });
}

export const deleteStanza = async (idStanza: number): Promise<AxiosResponse<boolean>> => {
    return axios.delete(apiURL+stanzaEndpoints.delete,{
        params: {
            idStanza
        }
    });
}