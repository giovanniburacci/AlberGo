import {RootState} from '../reducer.config';
import {PrenotazioneIbridaDTO} from '../../models/models';

const getPrenotazioni = (state:RootState): PrenotazioneIbridaDTO[] | undefined => state.prenotazioni.prenotazioni;

const getIsError = (state:RootState): boolean => state.prenotazioni.isError;

const getIsLoading = (state:RootState): boolean => state.prenotazioni.isLoading;

export const prenotazioniSelector = {
    getPrenotazioni,
    getIsError,
    getIsLoading
}

export default prenotazioniSelector;