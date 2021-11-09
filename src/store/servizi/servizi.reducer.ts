import {createReducer} from '@reduxjs/toolkit';
import {
    ServiziCreateState,
    ServiziDeleteState,
    ServiziDisponibiliState, ServiziSceltiState,
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

const initialServiziSceltiState : ServiziSceltiState = {
    isLoadingServiziScelti: false,
    isErrorServiziScelti: false
}

const initialState: ServiziState = {
    isLoading: false,
    isError: false,
    ...initialUpdateState,
    ...initialDeleteState,
    ...initialCreateState,
    ...initialServiziDisponibiliState,
    ...initialServiziSceltiState
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
        }).addCase(serviziActions.fetchServiziDisponibiliByPrenotazione.pending, (state) => {
            return {
                ...state,
                isLoadingServiziDisponibili: true,
                isErrorServiziDisponibili: false
            }
        }).addCase(serviziActions.fetchServiziDisponibiliByPrenotazione.rejected, (state) => {
            return {
                ...state,
                isLoadingServiziDisponibili: false,
                isErrorServiziDisponibili: true
            }
        }).addCase(serviziActions.fetchServiziDisponibiliByPrenotazione.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingServiziDisponibili: false,
                isErrorServiziDisponibili: false,
                serviziDisponibili: action.payload
            }
        }).addCase(serviziActions.fetchServiziSceltiByPrenotazione.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingServiziScelti: false,
                isErrorServiziScelti: false,
                serviziScelti: action.payload
            }
        }).addCase(serviziActions.fetchServiziSceltiByPrenotazione.pending, (state, action) => {
            return {
                ...state,
                isLoadingServiziScelti: true,
                isErrorServiziScelti: false,
            }
        }).addCase(serviziActions.fetchServiziSceltiByPrenotazione.rejected, (state, action) => {
            return {
                ...state,
                isLoadingServiziScelti: false,
                isErrorServiziScelti: true,
            }
        })
    })
}