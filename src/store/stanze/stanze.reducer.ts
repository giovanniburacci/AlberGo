import {createReducer} from '@reduxjs/toolkit';
import {StanzeDeleteState, StanzeEditState, StanzeState} from './types';
import stanzeActions from './stanze.action';

const initialEditState: StanzeEditState = {
    isLoadingEdit: false,
    isErrorEdit: false
}

const initialDeleteState: StanzeDeleteState = {
    isLoadingDelete: false,
    isErrorDelete: false
}

const initialState: StanzeState = {
    isLoading: false,
    isError: false,
    isErrorNewStanza: false,
    isLoadingNewStanza: false,
    ...initialEditState,
    ...initialDeleteState
}

export const stanzeReducer = {
    stanze: createReducer(initialState, (builder) => {
        builder.addCase(stanzeActions.fetchStanze.fulfilled, (state,action) => {
            return {
                ...state,
                stanze: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(stanzeActions.fetchStanze.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(stanzeActions.fetchStanze.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(stanzeActions.addStanza.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingNewStanza: false,
                isErrorNewStanza: false
            }
        }).addCase(stanzeActions.addStanza.pending, (state,action) => {
            return {
                ...state,
                isLoadingNewStanza: true,
                isErrorNewStanza: false
            }
        }).addCase(stanzeActions.addStanza.rejected, (state,action) => {
            return {
                ...state,
                isLoadingNewStanza: false,
                isErrorNewStanza: true
            }
        }).addCase(stanzeActions.fetchStanzeWithDates.fulfilled, (state,action) => {
                return {
                    ...state,
                    stanze: action.payload,
                    isLoading: false,
                    isError: false
                }
        }).addCase(stanzeActions.fetchStanzeWithDates.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(stanzeActions.fetchStanzeWithDates.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(stanzeActions.editStanza.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingEdit: false,
                isErrorEdit: false
            }
        }).addCase(stanzeActions.editStanza.pending, (state,action) => {
            return {
                ...state,
                isLoadingEdit: true,
                isErrorEdit: false
            }
        }).addCase(stanzeActions.editStanza.rejected, (state,action) => {
            return {
                ...state,
                isLoadingEdit: false,
                isErrorEdit: true
            }
        }).addCase(stanzeActions.removeStanza.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: false
            }
        }).addCase(stanzeActions.removeStanza.pending, (state,action) => {
            return {
                ...state,
                isLoadingDelete: true,
                isErrorDelete: false
            }
        }).addCase(stanzeActions.removeStanza.rejected, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: true
            }
        }).addCase(stanzeActions.filterBySelectedCategoria, (state,action) => {
            return {
                ...state,
                categoriaFilter: action.payload.idCategoria
            }
        })
    })
}