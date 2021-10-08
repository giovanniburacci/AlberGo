import {RootState} from '../reducer.config';
import {ClienteDTO} from '../../models/models';

const getClienti = (state:RootState): ClienteDTO[] | undefined => state.clienti.clienti;

const getIsError = (state:RootState): boolean => state.clienti.isError;

const getIsLoading = (state:RootState): boolean => state.clienti.isLoading;

export const clientiSelector = {
    getClienti,
    getIsError,
    getIsLoading
}

export default clientiSelector;