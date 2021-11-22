import {RootState} from '../reducer.config';
import {CardDataDTO} from '../../models/models';

export const getCard = (state:RootState): CardDataDTO | undefined => state.card.card

export const getIsLoading = (state:RootState): boolean => state.card.isLoading

export const getIsError = (state:RootState): boolean => state.card.isError

export const cardSelector = {
    getCard,
    getIsError,
    getIsLoading
}

export default cardSelector;