import {localhostURL} from './axiosConfig';
import {ServizioDTO, StanzaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'servizio/';

const servizioEndpoints = {
    lista: 'lista',
    create: 'create'
}

const apiURL = localhostURL + postfix;

export const searchServizi = async (idHotel: number): Promise<AxiosResponse<ServizioDTO[]>> => {
    return axios.get(apiURL+servizioEndpoints.lista,{
        params: {
            idHotel
        }
    });
}