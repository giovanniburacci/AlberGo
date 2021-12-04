import {createReducer} from '@reduxjs/toolkit';
import {
    CardState
} from './types';
import CardActions from './card.actions';

const initialState: CardState = {
    isLoading: false,
    isError: false,
    isLoadingCreate: false,
    isErrorDelete: false,
    isLoadingDelete: false,
    isErrorCreate: false
}

export const cardReducer = {
    card: createReducer(initialState, (builder) => {
        builder.addCase(CardActions.fetchCard.fulfilled, (state, action) => {
            return {
                ...state,
                card: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(CardActions.fetchCard.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(CardActions.fetchCard.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(CardActions.removeCard.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: false,
                card: undefined
            }
        }).addCase(CardActions.removeCard.pending, (state, action) => {
            return {
                ...state,
                isLoadingDelete: true,
                isErrorDelete: false
            }
        }).addCase(CardActions.removeCard.rejected, (state, action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: true
            }
        }).addCase(CardActions.addCard.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: false,
                card: action.payload
            }
        }).addCase(CardActions.addCard.pending, (state, action) => {
            return {
                ...state,
                isLoadingCreate: true,
                isErrorCreate: false
            }
        }).addCase(CardActions.addCard.rejected, (state, action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: true
            }
        })
    })
};
