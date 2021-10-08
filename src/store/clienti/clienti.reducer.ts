import {createReducer} from '@reduxjs/toolkit';
import {ClientiState} from './types';
import clientiActions from './clienti.action';

const initialState: ClientiState = {
    isLoading: false,
    isError: false
}
export const clientiReducer = {
    clienti: createReducer(initialState, (builder) => {
        builder.addCase(clientiActions.fetchClienti.fulfilled, ((state, action) => {
            return {
                ...state,
                clienti: action.payload,
                isLoading: false,
                isError: false
            }
        })).addCase(clientiActions.fetchClienti.pending, ((state, action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        })).addCase(clientiActions.fetchClienti.rejected, ((state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }))
    })
}