import {createReducer} from '@reduxjs/toolkit';
import {
    ServiziCreateState,
    ServiziDeleteState,
    ServiziDisponibiliState,
    ServiziState,
    ServiziUpdateState
} from './types';
import {serviziActions} from './servizi.action';


const initialCreateState: ServiziCreateState = {
    isLoadingCreate: false,
    isErrorCreate: false
}

const initialUpdateState: ServiziUpdateState = {
    isLoadingUpdate: false,
    isErrorUpdate: false
}

const initialDeleteState: ServiziDeleteState = {
    isLoadingDelete: false,
    isErrorDelete: false
}

const initialServiziDisponibiliState : ServiziDisponibiliState = {
    isLoadingServiziDisponibili: false,
    isErrorServiziDisponibili: false
}

const initialState: ServiziState = {
    isLoading: false,
    isError: false,
    ...initialUpdateState,
    ...initialDeleteState,
    ...initialCreateState,
    ...initialServiziDisponibiliState
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
        }).addCase(serviziActions.fetchServiziByPrenotazione.pending, (state) => {
            return {
                ...state,
                isLoadingServiziDisponibili: true,
                isErrorServiziDisponibili: false
            }
        }).addCase(serviziActions.fetchServiziByPrenotazione.rejected, (state) => {
            return {
                ...state,
                isLoadingServiziDisponibili: false,
                isErrorServiziDisponibili: true
            }
        }).addCase(serviziActions.fetchServiziByPrenotazione.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingServiziDisponibili: false,
                isErrorServiziDisponibili: false,
                serviziDisponibili: action.payload
            }
        })
    })
}