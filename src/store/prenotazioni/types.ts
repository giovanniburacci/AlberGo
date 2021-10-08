import {FatturaDTO} from '../../models/models';

export interface PrenotazioniState {
    prenotazioni?: FatturaDTO[]
    isLoading: boolean,
    isError: boolean
}