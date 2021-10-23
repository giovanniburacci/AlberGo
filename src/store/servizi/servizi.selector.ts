import {RootState} from '../reducer.config';
import {ServizioDTO} from '../../models/models';

const getServizi = (state:RootState): ServizioDTO[] | undefined => state.servizi.servizi;

const getIsError = (state:RootState): boolean => state.servizi.isError;

const getIsLoading = (state:RootState): boolean => state.servizi.isLoading;

const getIsErrorCreate = (state:RootState): boolean => state.servizi.isErrorCreate;

const getIsLoadingCreate = (state:RootState): boolean => state.servizi.isLoadingCreate;

export const serviziSelector = {
    getServizi,
    getIsError,
    getIsLoading,
    getIsErrorCreate,
    getIsLoadingCreate
}

export default serviziSelector;