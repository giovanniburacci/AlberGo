import {localhostURL} from './axiosConfig';
import {StanzaDTO} from '../models/models';
import axios, {AxiosResponse} from 'axios';


const postfix = 'stanza/';

const apiURL = localhostURL + postfix;


const stanzaEndpoints = {
    lista:'lista'
}

export const searchStanze = async (idHotel: number): Promise<AxiosResponse<StanzaDTO[]>> => {
    return axios.get(apiURL+stanzaEndpoints.lista,{
        params: {
            idHotel
        }
    });
}