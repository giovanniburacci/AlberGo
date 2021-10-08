import {localhostURL} from './axiosConfig';
import {ClienteDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'cliente/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista: 'lista',
    create: 'create'
}

export const searchClienti = async (idHotel: number): Promise<AxiosResponse<ClienteDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.lista,{
        params: {
            idHotel
        }
    });
}
