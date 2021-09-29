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
            console.log('fulfilled')
            return {
                prenotazioni: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioni.pending, (state,action) => {
            console.log('pending')
            return {
                prenotazioni: [],
                isLoading: true,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioni.rejected, (state,action) => {
            return {
                prenotazioni: [],
                isLoading: false,
                isError: true
            }
        })
    })
}