import {ClienteDTO} from '../../models/models';

export interface ClientiState {
    clienti?: ClienteDTO[]
    isLoading: boolean,
    isError: boolean
}