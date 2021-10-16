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
        builder.addCase(loginActions.loginRequest.fulfilled, (state,action) => {
            const {amministratore,id, token } = action.payload
            const idHotel = amministratore?.idHotel
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
        }).addCase(loginActions.loginRequest.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(loginActions.loginRequest.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(loginActions.logoutAction, (state) => {
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

