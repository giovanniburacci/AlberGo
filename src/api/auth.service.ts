import {localhostURL} from './axiosConfig';
import axios, {AxiosResponse} from 'axios';
import {AmministratoreDTO, HotelDTO} from '../models/models';
import {LoginBean, TokenResponse} from '../models/login';

const enum authEndpoints {
    login = 'login',
    amministratoreRegister = 'amministratore/register',
    searchAdmin = 'amministratore/dettaglio/username',
    userRegister = 'cliente/register',
    createHotel = 'hotel/create'
}

interface AdminRegisterBean {
    admin: Partial<AmministratoreDTO>,
    idHotel?: number,
    codiceHotel?: number
}

export const createHotel = async (hotel: Partial<HotelDTO>): Promise<AxiosResponse<HotelDTO>> => {
    return axios.post(localhostURL + authEndpoints.createHotel, {
        ...hotel,
    });
}

export const createAdmin = async (bean: AdminRegisterBean) => {
    const {admin,idHotel,codiceHotel} = bean;

    if(typeof idHotel !== 'undefined') {
        return axios.post(localhostURL + authEndpoints.amministratoreRegister, {
            ...admin,
            idHotel
        })
    }

    // todo add case of already existing hotel
}

export const login = async(bean: LoginBean): Promise<AxiosResponse<TokenResponse>> => {
    const params = new URLSearchParams();
    params.append('username',bean.username);
    params.append('password', bean.password);
    return axios.post(localhostURL + authEndpoints.login,params);
}

export const searchAdmin = async (username: string, token:string): Promise<AxiosResponse<AmministratoreDTO>> => {
    return axios.get(localhostURL + authEndpoints.searchAdmin,{
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: {
            username
        }
    })
}