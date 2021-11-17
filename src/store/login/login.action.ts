import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {login, loginUser} from '../../mocks/api';

enum LOGIN_ACTIONS {
    adminLogin = 'adminLogin/',
    adminLogout = 'adminLogout/',
    userLogin = 'userLogin/'
}

const adminLoginRequest = createAsyncThunk(LOGIN_ACTIONS.adminLogin, async ({}:{}) => { // params to be replaced with username and pass
    try {
        return await login();
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
    localStorage.removeItem('AlberGOData');
    return {
        payload: null
    }
});

export const logoutActions = {
    adminLoginRequest,
    userLoginRequest,
    adminLogoutAction
};

export default logoutActions;
