import {ServizioDTO} from '../../models/models';

export interface ServiziState {
    isLoading: boolean,
    isError: boolean,
    isLoadingCreate: boolean,
    isErrorCreate: boolean,
    isLoadingUpdate: boolean,
    isErrorUpdate: boolean,
    isLoadingDelete: boolean,
    isErrorDelete: boolean,
    servizi?: ServizioDTO[],

}