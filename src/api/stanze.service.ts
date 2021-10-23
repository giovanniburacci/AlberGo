import {localhostURL} from './axiosConfig';
import {StanzaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';
import {FetchWithDatesBean} from '../store/stanze/stanze.action';


const postfix = 'stanza/';

const apiURL = localhostURL + postfix;


const stanzaEndpoints = {
    lista: 'lista',
    create: 'create',
    libere: 'libere'
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

export const createStanza = async (stanza: Partial<StanzaDTO>): Promise<AxiosResponse<StanzaDTO>> => {
    return axios.post(apiURL+stanzaEndpoints.create,{
        ...stanza
    });
}
