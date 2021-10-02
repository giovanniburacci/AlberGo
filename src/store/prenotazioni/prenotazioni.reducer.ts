import {createReducer} from '@reduxjs/toolkit';
import {PrenotazioniState} from './types';
import prenotazioniActions from './prenotazioni.action';
const initialState: PrenotazioniState = {
    isLoading: false,
    isError: false
}
export const prenotazioniReducer = {
    prenotazioni: createReducer(initialState, (builder) => {
        builder.addCase(prenotazioniActions.fetchPrenotazioni.fulfilled, (state,action) => {
            return {
                prenotazioni: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioni.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioni.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        })
    })
}