import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {login, searchAdmin} from '../../api/auth.service';
import {loginUser} from '../../mocks/api';
import {AmministratoreDTO, HotelDTO} from '../../models/models';
import {createAdmin, createHotel} from '../../api/auth.service';
import {LoginBean} from '../../models/login';
import axios from 'axios';

const enum LOGIN_ACTIONS {
    adminLogin = 'adminLogin/',
    adminLogout = 'adminLogout/',
    userLogin = 'userLogin/',
    userLogout = 'userLogout/',
    adminRegister = 'adminRegister/'
}

interface AdminRegisterActionBean {
    admin: Partial<AmministratoreDTO>,
    hotel: Partial<HotelDTO>,
    codiceHotel?: number
}
const adminLoginRequest = createAsyncThunk(LOGIN_ACTIONS.adminLogin, async (bean:LoginBean) => {
    try {
        const adminToken = (await login(bean)).data.access_token;
        if(adminToken) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + adminToken;
        }
        const amministratore = (await searchAdmin(bean.username, adminToken)).data;
        return {
            adminToken,
            amministratore
        }
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const adminRegister = createAsyncThunk(LOGIN_ACTIONS.adminRegister, async (bean:AdminRegisterActionBean) => {
    try {
        const {admin,hotel,codiceHotel} = bean;
        if(hotel) {
            const resp = await createHotel(hotel);
            const newHotel = resp.data;
            await createAdmin({
                admin,
                idHotel: newHotel.id
            })
        }
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const userLoginRequest = createAsyncThunk(LOGIN_ACTIONS.userLogin, async ({}:{}) => { // params to be replaced with username and pass
    try {
        return await loginUser();
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const adminLogoutAction = createAction(LOGIN_ACTIONS.adminLogout, () => {
    localStorage.removeItem('AlberGOAdmin');
    return {
        payload: null
    }
});

const userLogoutAction = createAction(LOGIN_ACTIONS.userLogout, () => {
    localStorage.removeItem('AlberGOUser');
    return {
        payload: null
    }
});

export const loginActions = {
    adminLoginRequest,
    userLoginRequest,
    adminLogoutAction,
    userLogoutAction,
    adminRegister
};

export default loginActions;
