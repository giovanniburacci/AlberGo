import {RootState} from '../reducer.config';
import {CategoriaDTO} from '../../models/models';
import {NumeroStanze} from '../categorie/types';

const getCategorie = (state:RootState): CategoriaDTO[] | undefined => state.categorie.categorie;

const getIsError = (state:RootState): boolean => state.categorie.isError;

const getIsLoading = (state:RootState): boolean => state.categorie.isLoading;

const getIsErrorCreate = (state:RootState): boolean => state.categorie.isErrorCreate;

const getIsLoadingCreate = (state:RootState): boolean => state.categorie.isLoadingCreate;

const getNumeroStanze = (state:RootState): NumeroStanze[] | undefined => state.categorie.numeroStanze;

export const categorieSelector = {
    getCategorie,
    getIsError,
    getIsLoading,
    getIsErrorCreate,
    getIsLoadingCreate,
    getNumeroStanze
}

export default categorieSelector;