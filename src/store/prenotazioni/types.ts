import {FatturaDTO} from '../../models/models';

export interface PrenotazioniState {
    prenotazioni?: FatturaDTO[]
    isLoading: boolean,
    isError: boolean,
    isLoadingCreate: boolean,
    isErrorCreate: boolean,
    isLoadingEdit: boolean,
    isErrorEdit: boolean,
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}