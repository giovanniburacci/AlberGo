import {localhostURL} from './axiosConfig';
import {CategoriaDTO, FetchCategorieWithName} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'categoria/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista: 'lista',
    create: 'create',
    searchNome: 'searchNome'
}

export const searchCategorie = async (idHotel: number): Promise<AxiosResponse<CategoriaDTO[]>> => {
    return axios.get(apiURL+categorieEndpoints.lista,{
        params: {
            idHotel
        }
    });
}

export const createCategoria = async (categoria: Partial<CategoriaDTO>): Promise<AxiosResponse<CategoriaDTO>> => {
    return axios.post(apiURL + categorieEndpoints.create, {
        ...categoria
    })
}

export const searchFilteredByNome = async (filterBean:FetchCategorieWithName): Promise<AxiosResponse<CategoriaDTO[]>> => {
    return axios.get(apiURL + categorieEndpoints.searchNome, {
        params: {
            ...filterBean
        }
    })
}