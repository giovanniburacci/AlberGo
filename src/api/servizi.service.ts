import {localhostURL} from './axiosConfig';
import {ServizioDTO, StanzaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'servizio/';

const servizioEndpoints = {
    lista: 'lista',
    create: 'create',
    delete: 'delete',
    update: 'update'
}

const apiURL = localhostURL + postfix;

export const searchServizi = async (idHotel: number): Promise<AxiosResponse<ServizioDTO[]>> => {
    return axios.get(apiURL+servizioEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const createServizio = async (servizio: Partial<ServizioDTO>): Promise<AxiosResponse<ServizioDTO>> => {
    return axios.post(apiURL+servizioEndpoints.create,{
        ...servizio
    });
}

export const deleteServizio = async (idServizio: number): Promise<AxiosResponse<ServizioDTO>> => {
    return axios.delete(apiURL+servizioEndpoints.delete,{
        params: {
            idServizio
        }
    });
}


export const updateServizio = async (servizio: ServizioDTO): Promise<AxiosResponse<ServizioDTO>> => {
    return axios.put(apiURL+servizioEndpoints.update,{
        ...servizio
    });
}