import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '../../mocks/api';
import {AdminData} from '../../models/login';

enum LOGIN_ACTIONS {
    adminLogin = 'adminLogin/',
    adminLogout = 'adminLogout/'
}

const adminLoginRequest = createAsyncThunk(LOGIN_ACTIONS.adminLogin, async (userData: AdminData) => {
    try {
        return await login(userData);
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const adminLogoutAction = createAction(LOGIN_ACTIONS.adminLogout, () => {
    localStorage.removeItem('AlberGOData');
    return {
        payload: null
    }
});

export const logoutActions = {
    adminLoginRequest,
    adminLogoutAction
};

export default logoutActions;
