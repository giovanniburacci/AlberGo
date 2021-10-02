import {RootState} from '../reducer.config';
import {CategoriaDTO} from '../../models/models';

const getCategorie = (state:RootState): CategoriaDTO[] | undefined => state.categorie.categorie;

const getIsError = (state:RootState): boolean => state.categorie.isError;

const getIsLoading = (state:RootState): boolean => state.categorie.isLoading;

export const categorieSelector = {
    getCategorie,
    getIsError,
    getIsLoading
}

export default categorieSelector;