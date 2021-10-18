import {ServizioDTO} from '../../models/models';

export interface ServiziState {
    isLoading: boolean,
    isError: boolean,
    servizi?: ServizioDTO[]
}