import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '../../mocks/api';
import {AdminData} from '../../models/login';

enum LOGIN_ACTIONS {
    login = 'login/',
    logout = 'logout/'
}

const loginRequest = createAsyncThunk(LOGIN_ACTIONS.login, async (userData: AdminData) => {
    try {
        return await login(userData);
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const logoutAction = createAction(LOGIN_ACTIONS.logout, () => {
    localStorage.removeItem('AlberGOData');
    return {
        payload: null
    }
});

export const logoutActions = {
    loginRequest,
    logoutAction
};

export default logoutActions;
