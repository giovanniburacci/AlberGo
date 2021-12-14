import axios, {AxiosResponse} from 'axios';
import {localhostURL} from './axiosConfig';
import {HotelDTO} from '../models/models';

const postfix = 'hotel/';

const apiURL = localhostURL + postfix;

const hotelsEndpoints = {
    dettaglio: 'dettaglio',
    searchHotels: 'allhotel'
}

export const searchHotel = async (idHotel: number): Promise<AxiosResponse<HotelDTO>> => {
    return axios.get(apiURL+hotelsEndpoints.dettaglio, {
        params: {
            idHotel
        }
    });
}

export const searchHotels = async (): Promise<AxiosResponse<HotelDTO[]>> => {
    return axios.get(apiURL+hotelsEndpoints.searchHotels);
}