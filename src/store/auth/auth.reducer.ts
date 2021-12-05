import {createReducer} from '@reduxjs/toolkit';
import loginActions from '../auth/auth.action';
import {LoginData} from './types';

const storedAdminData = localStorage.getItem('AlberGOAdmin');
const storedUserData = localStorage.getItem('AlberGOUser');

let adminToken = null, userToken = null, amministratore = null, user = null;

if(storedAdminData) {
    const parsedData = JSON.parse(storedAdminData);
    if(parsedData.token && parsedData.amministratore) {
        adminToken = parsedData.token;
        amministratore = parsedData.amministratore;
    }
}

if(storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    if(parsedData.token && parsedData.user) {
        userToken = parsedData.token;
        user = parsedData.user;
    }
}

const initialState:LoginData = {
    userToken,
    adminToken,
    user,
    amministratore,
    isLoading: false,
    isError: false,
    isLoadingRegister: false,
    isErrorRegister: false
}

export const authReducer = {
    login: createReducer(initialState, (builder) => {
        builder.addCase(loginActions.adminLoginRequest.fulfilled, (state,action) => {
            const amministratore = action.payload.amministratore;
            const adminToken = action.payload.adminToken;
            localStorage.setItem('AlberGOAdmin', JSON.stringify({
                amministratore,
                token: adminToken
            }));
            return {
                ...state,
                adminToken,
                amministratore,
                isLoading: false,
                isError: false
            }
        }).addCase(loginActions.adminLoginRequest.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(loginActions.adminLoginRequest.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(loginActions.adminLogoutAction, (state) => {
            return {
                ...state,
                amministratore: undefined,
                adminToken: undefined
            }
        }).addCase(loginActions.userLoginRequest.fulfilled, (state, action) => {
            const {userToken, user} = action.payload
            localStorage.setItem('AlberGOUser', JSON.stringify({
                user,
                token: userToken
            }));
            return {
                ...state,
                userToken,
                isError: false,
                isLoading: false,
                user
            }
        }).addCase(loginActions.userLoginRequest.pending, (state, action) => {
            return {
                ...state,
                isError: false,
                isLoading: true,
            }
        }).addCase(loginActions.userLoginRequest.rejected, (state, action) => {
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        }).addCase(loginActions.userLogoutAction, (state) => {
            return {
                ...state,
                user: undefined,
                userToken: undefined
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

