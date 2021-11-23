import {RootState} from '../reducer.config';
import {StanzaDTO} from '../../models/models';
import {StanzaWithStatus} from './types';

const getStanze = (state:RootState): StanzaWithStatus[] | undefined => {
    const {stanze, categoriaFilter} = state.stanze
    return stanze && (
        categoriaFilter ? (
            stanze.filter(s => s.idCategoria === categoriaFilter)
        ) : (
            stanze
        )
    )
};

const getCategoriaFilter = (state:RootState): number | undefined => state.stanze.categoriaFilter;

const getIsError = (state:RootState): boolean => state.stanze.isError;

const getIsLoading = (state:RootState): boolean => state.stanze.isLoading;

const getIsLoadingEdit = (state:RootState): boolean => state.stanze.isLoadingEdit;

export const stanzeSelector = {
    getStanze,
    getIsError,
    getIsLoading,
    getIsLoadingEdit,
    getCategoriaFilter
}

export default stanzeSelector;