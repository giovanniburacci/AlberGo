import {localhostURL} from './axiosConfig';
import {CategoriaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'categoria/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista: 'lista',
    create: 'create'
}

export const searchCategorie = async (idHotel: number): Promise<AxiosResponse<CategoriaDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const createCategoria = async (categoria: Partial<CategoriaDTO>): Promise<AxiosResponse<CategoriaDTO>> => {
    console.log('categoria', categoria)
    return axios.post(apiURL + categorieEndpoints.create, {
        ...categoria
    })
}