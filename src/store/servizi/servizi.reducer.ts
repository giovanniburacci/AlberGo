import {createReducer} from '@reduxjs/toolkit';
import {ServiziState} from './types';
import {serviziActions} from './servizi.action';

const initialState: ServiziState = {
    isLoading: false,
    isError: false
}
export const serviziReducer = {
    servizi: createReducer(initialState, (builder) => {
        builder.addCase(serviziActions.fetchServizi.fulfilled, ((state, action) => {
            return {
                ...state,
                servizi: action.payload,
                isLoading: false,
                isError: false
            }
        })).addCase(serviziActions.fetchServizi.pending, ((state, action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        })).addCase(serviziActions.fetchServizi.rejected, ((state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }))
    })
}