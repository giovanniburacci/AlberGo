import {localhostURL} from './axiosConfig';
import {CategoriaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'categoria/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista:'lista'
}

export const searchCategorie = async (idHotel: number): Promise<AxiosResponse<CategoriaDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.lista,{
        params: {
            idHotel
        }
    });
}