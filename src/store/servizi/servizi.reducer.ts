import {createReducer} from '@reduxjs/toolkit';
import {ServiziState} from './types';
import {serviziActions} from './servizi.action';

const initialState: ServiziState = {
    isLoading: false,
    isError: false,
    isLoadingCreate: false,
    isErrorCreate: false,
    isLoadingDelete: false,
    isLoadingUpdate: false,
    isErrorDelete: false,
    isErrorUpdate: false
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
        })).addCase(serviziActions.addServizio.fulfilled, ((state, action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: false
            }
        })).addCase(serviziActions.addServizio.pending, (state) => {
            return {
                ...state,
                isLoadingCreate: true,
                isErrorCreate: false
            }
        }).addCase(serviziActions.addServizio.rejected, (state) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: true
            }
        })
    })
}