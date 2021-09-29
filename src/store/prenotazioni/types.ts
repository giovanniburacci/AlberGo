import {PrenotazioneIbridaDTO} from '../../models/models';

export interface PrenotazioniState {
    prenotazioni?: PrenotazioneIbridaDTO[]
    isLoading: boolean,
    isError: boolean
}