import {createReducer} from '@reduxjs/toolkit';
import {AmministratoreLogin} from './types';
import loginActions from './login.action';
import {getAmministratoreStub} from '../../mocks/stubs/amministratore';

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

const initialState:AmministratoreLogin = {
    token,
    amministratore: getAmministratoreStub(),
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
                ...state,
                idHotel,
                id,
                token,
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
                idAmministratore: undefined,
                idHotel: undefined,
                token: undefined,
                isError: false,
                isLoading: false
            }
        })
    })
}

