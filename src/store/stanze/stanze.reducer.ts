import {createReducer} from '@reduxjs/toolkit';
import {StanzeState} from './types';
import stanzeActions from './stanze.action';

const initialState: StanzeState = {
    isLoading: false,
    isError: false
}

export const stanzeReducer = {
    stanze: createReducer(initialState, (builder) => {
        builder.addCase(stanzeActions.fetchStanze.fulfilled, (state,action) => {
            return {
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
        })
    })
}