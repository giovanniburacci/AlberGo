import {createAsyncThunk} from '@reduxjs/toolkit';
import {AmministratoreLogin} from './types';
import {login} from '../../mocks/api';
import {AdminData} from '../../models/login';

enum LOGIN_ACTIONS {
    login = 'login/'
}

export const loginRequest = createAsyncThunk(LOGIN_ACTIONS.login, async (userData: AdminData) => {
    console.log('baobao')
    try {
        return await login(userData);
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
})
