import {createReducer} from '@reduxjs/toolkit';
import {AmministratoreLogin} from './types';
import loginActions from './login.action';

const storedData = localStorage.getItem('AlberGOData');

let token = null, idAmministratore = null, idHotel = null;
if(storedData) {
    const parsedData = JSON.parse(storedData);
    if(parsedData.token && parsedData.idAmministratore && parsedData.idHotel) {
        token = parsedData.token;
        idAmministratore = parsedData.idAmministratore;
        idHotel = parsedData.idHotel;
    }
}

const initialState:AmministratoreLogin = {
    token,
    idAmministratore,
    idHotel
}

export const loginReducer = {
    login: createReducer(initialState, (builder) => {
        builder.addCase(loginActions.loginRequest.fulfilled, (state,action) => {
            const {idHotel,idAmministratore, token } = action.payload
            localStorage.setItem('AlberGOData', JSON.stringify({
                idHotel,
                idAmministratore,
                token
            }));
            return {
                ...state,
                idHotel,
                idAmministratore,
                token
            }
        }).addCase(loginActions.loginRequest.rejected, (state,action) => {
            return {
                ...state
            }
        }).addCase(loginActions.loginRequest.pending, (state,action) => {
            return {
                ...state
            }
        }).addCase(loginActions.logoutAction, (state) => {
            return {
                idAmministratore: undefined,
                idHotel: undefined,
                token: undefined
            }
        })
    })
}

