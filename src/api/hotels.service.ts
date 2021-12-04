import axios, {AxiosResponse} from 'axios';
import {localhostURL} from './axiosConfig';
import {HotelDTO} from '../models/models';

const postfix = 'hotel/';

const apiURL = localhostURL + postfix;

const hotelsEndpoints = {
    searchHotels: 'allhotel'
}

export const searchHotels = async (): Promise<AxiosResponse<HotelDTO[]>> => {
    return axios.get(apiURL+hotelsEndpoints.searchHotels);
}