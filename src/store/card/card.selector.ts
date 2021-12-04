import {RootState} from '../reducer.config';
import {CardDataDTO} from '../../models/models';

export const getCard = (state:RootState): CardDataDTO | undefined => state.card.card

export const getIsLoading = (state:RootState): boolean => state.card.isLoading

export const getIsError = (state:RootState): boolean => state.card.isError

export const getIsLoadingCreate = (state:RootState): boolean => state.card.isLoadingCreate

export const getIsErrorCreate = (state:RootState): boolean => state.card.isErrorCreate

export const getIsLoadingDelete = (state:RootState): boolean => state.card.isErrorDelete

export const getIsErrorDelete = (state:RootState): boolean => state.card.isErrorDelete

export const cardSelector = {
    getCard,
    getIsError,
    getIsLoading,
    getIsLoadingCreate,
    getIsErrorDelete,
    getIsLoadingDelete,
    getIsErrorCreate
}

export default cardSelector;