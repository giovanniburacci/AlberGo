import {createReducer} from '@reduxjs/toolkit';
import {CategorieState} from './types';
import categorieActions from './categorie.action';

const initialState: CategorieState = {
    isLoading: false,
    isError: false
}

export const categorieReducer = {
    categorie: createReducer(initialState, (builder) => {
        builder.addCase(categorieActions.fetchCategorie.fulfilled, (state,action) => {
            return {
                categorie: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(categorieActions.fetchCategorie.pending, (state,action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }).addCase(categorieActions.fetchCategorie.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        })
    })
}