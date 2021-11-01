import {createReducer} from '@reduxjs/toolkit';
import {CategorieCreateState, CategorieState, NumeroStanzeState} from './types';
import categorieActions from './categorie.action';

const initialNumeroStanzeState: NumeroStanzeState = {
    isLoadingNumeroStanze: false,
    isErrorNumeroStanze: false
}

const initialCreateState: CategorieCreateState = {
    isLoadingCreate: false,
    isErrorCreate: false,
}

const initialState: CategorieState = {
    isLoading: false,
    isError: false,
    ...initialNumeroStanzeState,
    ...initialCreateState
}


export const categorieReducer = {
    categorie: createReducer(initialState, (builder) => {
        builder.addCase(categorieActions.fetchCategorie.fulfilled, (state,action) => {
            return {
                ...state,
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
        }).addCase(categorieActions.fetchFilteredCategorie.fulfilled, (state,action) => {
            return {
                ...state,
                categorie: action.payload,
                isLoading: false,
                isError: false
            }
        }).addCase(categorieActions.fetchFilteredCategorie.pending, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(categorieActions.fetchFilteredCategorie.rejected, (state,action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }).addCase(categorieActions.addCategoria.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: false
            }
        }).addCase(categorieActions.addCategoria.rejected, (state,action) => {
            return {
                ...state,
                isLoadingCreate: false,
                isErrorCreate: true
            }
        }).addCase(categorieActions.addCategoria.pending, (state,action) => {
            return {
                ...state,
                isLoadingCreate: true,
                isErrorCreate: false
            }
        }).addCase(categorieActions.fetchNumeroStanzeForCategoria.pending, (state,action) => {
            return {
                ...state,
                isLoadingNumeroStanze: true,
                isErrorNumeroStanze: false
            }
        }).addCase(categorieActions.fetchNumeroStanzeForCategoria.rejected, (state,action) => {
            return {
                ...state,
                isLoadingNumeroStanze: false,
                isErrorNumeroStanze: true
            }
        }).addCase(categorieActions.fetchNumeroStanzeForCategoria.fulfilled, (state,action) => {
            return {
                ...state,
                numeroStanze: action.payload,
                isLoadingNumeroStanze: false,
                isErrorNumeroStanze: false
            }
        })

    })
}