import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {createUser, login, searchAdmin, searchUser} from '../../api/auth.service';
import {AmministratoreDTO, CardDataDTO, ClienteDTO, HotelDTO} from '../../models/models';
import {createAdmin, createHotel} from '../../api/auth.service';
import {LoginBean} from '../../models/login';
import axios from 'axios';
import {createCard} from '../../api/stripe.service';

const enum LOGIN_ACTIONS {
    adminLogin = 'adminLogin/',
    adminLogout = 'adminLogout/',
    userLogin = 'userLogin/',
    userLogout = 'userLogout/',
    adminRegister = 'adminRegister/',
    userRegister = 'userRegister/'
}

interface AdminRegisterActionBean {
    admin: Partial<AmministratoreDTO>,
    hotel: Partial<HotelDTO>,
    codiceHotel?: number
}

interface UserRegisterActionBean {
    user: Partial<ClienteDTO>,
    card: Partial<CardDataDTO>
}
const adminLoginRequest = createAsyncThunk(LOGIN_ACTIONS.adminLogin, async (bean:LoginBean) => {
    try {
        const adminToken = (await login(bean)).data.access_token;
        if(adminToken) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + adminToken;
        }
        const amministratore = (await searchAdmin(bean.username)).data;
        return {
            adminToken,
            amministratore
        }
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const userLoginRequest = createAsyncThunk(LOGIN_ACTIONS.userLogin, async (bean:LoginBean) => {
    try {
        const userToken = (await login(bean)).data.access_token;
        if(userToken) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + userToken;
        }
        const user = (await searchUser(bean.username)).data;
        return {
            userToken,
            user
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
        console.log('Admin register request failed')
        throw e;
    }
});

const userRegister = createAsyncThunk(LOGIN_ACTIONS.userRegister, async (bean:UserRegisterActionBean) => {
    try {
        const {user, card} = bean;
        const idCliente = (await createUser(user)).data;
        await createCard({
            ...card,
            idCliente
        });

    } catch(e) {
        console.log('Admin register request failed')
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
    adminRegister,
    userRegister
};

export default loginActions;
