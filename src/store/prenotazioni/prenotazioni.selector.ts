import {RootState} from '../reducer.config';
import {PrenotazioneIbridaDTO} from '../../models/models';

export const getPrenotazioni = (state:RootState): PrenotazioneIbridaDTO[] | undefined => state.prenotazioni.prenotazioni;

export const getIsError = (state:RootState): boolean => state.prenotazioni.isError;

export const getIsLoading = (state:RootState): boolean => state.prenotazioni.isLoading;