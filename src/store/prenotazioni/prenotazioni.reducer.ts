import {createReducer} from '@reduxjs/toolkit';
import {PrenotazioniState} from './types';
import prenotazioniActions from './prenotazioni.action';
const initialState: PrenotazioniState = {
    isLoading: false,
    isError: false,
    isLoadingEdit: false,
    // isErrorCreate: false,
    // isErrorEdit: false,
    isLoadingCreate: false,
    isLoadingDelete: false
}
export const prenotazioniReducer = {
    prenotazioni: createReducer(initialState, (builder) => {
        builder.addCase(prenotazioniActions.fetchPrenotazioni.fulfilled, (state,action) => {
            return {
                ...state,
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
        }).addCase(prenotazioniActions.fetchFilteredPrenotazioni.fulfilled, (state,action) => {
            return {
                ...state,
                prenotazioni: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchFilteredPrenotazioni.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchFilteredPrenotazioni.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(prenotazioniActions.addPrenotazione.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: false
            }
        }).addCase(prenotazioniActions.addPrenotazione.pending, (state,action) => {
            return {
                ...state,
                isLoadingCreate: true,
                isErrorCreate: false
            }
        }).addCase(prenotazioniActions.addPrenotazione.rejected, (state,action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: true
            }
        }).addCase(prenotazioniActions.editPrenotazione.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingEdit: false,
                isErrorEdit: false
            }
        }).addCase(prenotazioniActions.editPrenotazione.pending, (state,action) => {
            return {
                ...state,
                isLoadingEdit: true,
                isErrorEdit: false
            }
        }).addCase(prenotazioniActions.editPrenotazione.rejected, (state,action) => {
            return {
                ...state,
                isLoadingEdit: false,
                isErrorEdit: true
            }
        }).addCase(prenotazioniActions.removePrenotazione.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: false
            }
        }).addCase(prenotazioniActions.removePrenotazione.pending, (state,action) => {
            return {
                ...state,
                isLoadingDelete: true,
                isErrorDelete: false
            }
        }).addCase(prenotazioniActions.removePrenotazione.rejected, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: true
            }
        }).addCase(prenotazioniActions.fetchPrenotazioniByCliente.fulfilled, (state,action) => {
            return {
                ...state,
                prenotazioni: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioniByCliente.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(prenotazioniActions.fetchPrenotazioniByCliente.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        })
    })
}