import {createReducer} from '@reduxjs/toolkit';
import loginActions from '../auth/auth.action';
import {LoginData} from './types';

const storedAdminData = localStorage.getItem('AlberGOAdmin');
const storedUserData = localStorage.getItem('AlberGOUser');

let adminToken = null, userToken = null, amministratore = null, user = null, adminDuration = 0, userDuration = 0;

if(storedAdminData) {
    const parsedData = JSON.parse(storedAdminData);
    if(parsedData.token && parsedData.amministratore && parsedData.duration) {
        adminToken = parsedData.token;
        amministratore = parsedData.amministratore;
        adminDuration = parsedData.duration
    }
}

if(storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    if(parsedData.token && parsedData.user && parsedData.duration) {
        userToken = parsedData.token;
        user = parsedData.user;
        userDuration = parsedData.duration
    }
}

const initialState:LoginData = {
    userToken,
    adminToken,
    userDuration,
    adminDuration,
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
            const adminToken = action.payload.adminToken;
            localStorage.setItem('AlberGOAdmin', JSON.stringify({
                amministratore,
                token: adminToken,
                duration: 600000
            }));
            return {
                ...state,
                adminToken,
                amministratore,
                adminDuration: 600000,
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
            const {userToken, user} = action.payload
            localStorage.setItem('AlberGOUser', JSON.stringify({
                user,
                token: userToken,
                duration: 600000
            }));
            return {
                ...state,
                userToken,
                isErrorUserLogin: false,
                isLoadingUserLogin: false,
                userDuration: 600000,
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

