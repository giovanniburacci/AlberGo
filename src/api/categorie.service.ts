import {localhostURL} from './axiosConfig';
import {CategoriaDTO, FetchCategorieWithName} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'categoria/';

const apiURL = localhostURL + postfix;


const categorieEndpoints = {
    lista: 'lista',
    create: 'create',
    searchNome: 'searchNome',
    update: 'update',
    delete: 'delete'
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

export const updateCategoria = async (categoria: CategoriaDTO): Promise<AxiosResponse<CategoriaDTO>> => {
    return axios.put(apiURL + categorieEndpoints.update, {
        ...categoria
    })
}

export const deleteCategoria = async (idCategoria: number): Promise<AxiosResponse<boolean>> => {
    return axios.delete(apiURL + categorieEndpoints.delete, {
        params: {
            idCategoria
        }
    })
}

export const searchFilteredByNome = async (filterBean:FetchCategorieWithName): Promise<AxiosResponse<CategoriaDTO[]>> => {
    return axios.get(apiURL + categorieEndpoints.searchNome, {
        params: {
            ...filterBean
        }
    })
}