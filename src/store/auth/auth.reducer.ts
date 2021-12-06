import {createReducer} from '@reduxjs/toolkit';
import loginActions from '../auth/auth.action';
import {LoginData} from './types';
import axios from 'axios';
const storedAdminData = localStorage.getItem('AlberGOAdmin');
const storedUserData = localStorage.getItem('AlberGOUser');

let adminToken = null, userToken = null, amministratore = null, user = null, adminExpiration = '', userExpiration = '';

if(storedAdminData) {
    const parsedData = JSON.parse(storedAdminData);
    if(parsedData.token && parsedData.amministratore && parsedData.expiration) {
        adminToken = parsedData.token;
        amministratore = parsedData.amministratore;
        adminExpiration = parsedData.expiration
        axios.defaults.headers['Authorization'] = 'Bearer ' + adminToken
    }
}

if(storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    console.log('ciauuu', parsedData)
    if(parsedData.token && parsedData.user && parsedData.expiration) {
        console.log('prova if')
        userToken = parsedData.token;
        user = parsedData.user;
        userExpiration = parsedData.expiration
        axios.defaults.headers['Authorization'] = 'Bearer ' + userToken
    }
}

const initialState:LoginData = {
    userToken,
    adminToken,
    userExpiration,
    adminExpiration,
    user,
    amministratore,
    isLoading: false,
    isError: false,
    isLoadingRegister: false,
    isErrorRegister: false,
    isLoadingAdminLogin: false,
    isErrorAdminLogin: false,
    isLoadingUserLogin: false,
    isErrorUserLogin: false
}

export const authReducer = {
    login: createReducer(initialState, (builder) => {
        builder.addCase(loginActions.adminLoginRequest.fulfilled, (state,action) => {
            const amministratore = action.payload.amministratore;
            const adminToken = action.payload.tokenInfo.access_token;
            const expiration = action.payload.tokenInfo.token_expiration
            localStorage.setItem('AlberGOAdmin', JSON.stringify({
                amministratore,
                token: adminToken,
                expiration
            }));
            return {
                ...state,
                adminToken,
                amministratore,
                adminExpiration: expiration,
                isLoadingAdminLogin: false,
                isErrorAdminLogin: false
            }
        }).addCase(loginActions.adminLoginRequest.rejected, (state,action) => {
            return {
                ...state,
                isLoadingAdminLogin: false,
                isErrorAdminLogin: true
            }
        }).addCase(loginActions.adminLoginRequest.pending, (state,action) => {
            return {
                ...state,
                isLoadingAdminLogin: true,
                isErrorAdminLogin: false
            }
        }).addCase(loginActions.adminLogoutAction, (state) => {
            return {
                ...state,
                amministratore: undefined,
                adminToken: undefined,
                adminDuration: 0
            }
        }).addCase(loginActions.userLoginRequest.fulfilled, (state, action) => {
            const {tokenInfo, user} = action.payload
            localStorage.setItem('AlberGOUser', JSON.stringify({
                user,
                token: tokenInfo.access_token,
                expiration: tokenInfo.token_expiration
            }));
            return {
                ...state,
                userToken: tokenInfo.access_token,
                isErrorUserLogin: false,
                isLoadingUserLogin: false,
                userExpiration: tokenInfo.token_expiration,
                user
            }
        }).addCase(loginActions.userLoginRequest.pending, (state, action) => {
            return {
                ...state,
                isErrorUserLogin: false,
                isLoadingUserLogin: true,
            }
        }).addCase(loginActions.userLoginRequest.rejected, (state, action) => {
            return {
                ...state,
                isErrorUserLogin: true,
                isLoadingUserLogin: false,
            }
        }).addCase(loginActions.userLogoutAction, (state) => {
            return {
                ...state,
                user: undefined,
                userToken: undefined,
                userDuration: 0
            }
        }).addCase(loginActions.adminRegister.pending, (state,action) => {
            return {
                ...state,
                isLoadingRegister: true,
                isErrorRegister: false
            }
        }).addCase(loginActions.adminRegister.rejected, (state,action) => {
            return {
                ...state,
                isLoadingRegister: false,
                isErrorRegister: true
            }
        }).addCase(loginActions.adminRegister.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingRegister: false,
                isErrorRegister: false
            }
        })
    })
}

