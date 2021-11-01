import {localhostURL} from './axiosConfig';
import {ClienteDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';
import {FetchClientiBean} from '../store/clienti/clienti.action';


const postfix = 'cliente/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista: 'lista',
    create: 'create',
    searchNomeCognome: 'searchNomeCognome'
}

export const searchClienti = async (idHotel: number): Promise<AxiosResponse<ClienteDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const filterClientiByNomeCognome = async (filterBean: FetchClientiBean): Promise<AxiosResponse<ClienteDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.searchNomeCognome,{
        params: {
            ...filterBean
        }
    });
}
