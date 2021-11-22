import {createReducer} from '@reduxjs/toolkit';
import {
    CardState
} from './types';
import CardActions from './card.actions';

const initialState: CardState = {
    isLoading: false,
    isError: false
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
        })
    })
};
