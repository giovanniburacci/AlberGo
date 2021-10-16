import {RootState} from '../reducer.config';
import {FatturaDTO} from '../../models/models';

const getPrenotazioni = (state:RootState): FatturaDTO[] | undefined => state.prenotazioni.prenotazioni;

const getIsError = (state:RootState): boolean => state.prenotazioni.isError;

const getIsLoading = (state:RootState): boolean => state.prenotazioni.isLoading;

const getIsLoadingCreate = (state:RootState): boolean => state.prenotazioni.isLoadingCreate;

// const getIsErrorCreate = (state:RootState): boolean => state.prenotazioni.isErrorCreate;

const getIsLoadingEdit = (state:RootState): boolean => state.prenotazioni.isLoadingEdit;

// const getIsErrorEdit = (state:RootState): boolean => state.prenotazioni.isErrorEdit;

const getIsLoadingDelete = (state:RootState): boolean => state.prenotazioni.isLoadingDelete

export const prenotazioniSelector = {
    getPrenotazioni,
    getIsError,
    getIsLoading,
    // getIsErrorCreate,
    getIsLoadingCreate,
    // getIsErrorEdit,
    getIsLoadingEdit
}

export default prenotazioniSelector;