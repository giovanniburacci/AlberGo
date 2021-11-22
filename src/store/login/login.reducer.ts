import {createReducer} from '@reduxjs/toolkit';
import loginActions from './login.action';
import {LoginData} from './types';

const storedData = localStorage.getItem('AlberGOData');

let token = null, id = null, idHotel = null;
if(storedData) {
    const parsedData = JSON.parse(storedData);
    if(parsedData.token && parsedData.id && parsedData.idHotel) {
        token = parsedData.token;
        id = parsedData.id;
        idHotel = parsedData.idHotel;
    }
}

const initialState:LoginData = {
    token,
    isLoading: false,
    isError: false
}

export const loginReducer = {
    login: createReducer(initialState, (builder) => {
        builder.addCase(loginActions.adminLoginRequest.fulfilled, (state,action) => {
            const {amministratore, token } = action.payload
            const idHotel = amministratore?.idHotel
            const id = amministratore?.id
            localStorage.setItem('AlberGOData', JSON.stringify({
                idHotel,
                id,
                token
            }));
            return {
                token,
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
                token: undefined,
                isError: false,
                isLoading: false
            }
        }).addCase(loginActions.userLoginRequest.fulfilled, (state, action) => {
            const {token, user} = action.payload
            return {
                ...state,
                token,
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
        })
    })
}

