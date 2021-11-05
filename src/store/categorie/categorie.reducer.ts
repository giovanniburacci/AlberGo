import {createReducer} from '@reduxjs/toolkit';
import {
    CategorieCreateState,
    CategorieDeleteState,
    CategorieState,
    CategorieUpdateState,
    NumeroStanzeState
} from './types';
import categorieActions from './categorie.action';

const initialNumeroStanzeState: NumeroStanzeState = {
    isLoadingNumeroStanze: false,
    isErrorNumeroStanze: false
}

const initialCreateState: CategorieCreateState = {
    isLoadingCreate: false,
    isErrorCreate: false,
}

const initialDeleteState: CategorieDeleteState = {
    isLoadingDelete: false,
    isErrorDelete: false,
}

const initialUpdateState: CategorieUpdateState = {
    isLoadingUpdate: false,
    isErrorUpdate: false,
}

const initialState: CategorieState = {
    isLoading: false,
    isError: false,
    ...initialNumeroStanzeState,
    ...initialCreateState,
    ...initialDeleteState,
    ...initialUpdateState
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
        }).addCase(categorieActions.removeCategoria.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: false
            }
        }).addCase(categorieActions.removeCategoria.pending, (state,action) => {
            return {
                ...state,
                isLoadingDelete: true,
                isErrorDelete: false
            }
        }).addCase(categorieActions.removeCategoria.rejected, (state,action) => {
            return {
                ...state,
                isLoadingDelete: false,
                isErrorDelete: true
            }
        }).addCase(categorieActions.editCategoria.fulfilled, (state,action) => {
            return {
                ...state,
                isLoadingUpdate: false,
                isErrorUpdate: false
            }
        }).addCase(categorieActions.editCategoria.pending, (state,action) => {
            return {
                ...state,
                isLoadingUpdate: true,
                isErrorUpdate: false
            }
        }).addCase(categorieActions.editCategoria.rejected, (state,action) => {
            return {
                ...state,
                isLoadingUpdate: false,
                isErrorUpdate: true
            }
        })

    })
}