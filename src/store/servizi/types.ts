import {ServizioDTO} from '../../models/models';

export interface ServiziState extends ServiziCreateState, ServiziUpdateState, ServiziDeleteState, ServiziDisponibiliState, ServiziSceltiState{
    isLoading: boolean,
    isError: boolean,
    servizi?: ServizioDTO[]
}

export interface ServiziDisponibiliState {
    serviziDisponibili?: ServizioDTO[]
    isLoadingServiziDisponibili: boolean,
    isErrorServiziDisponibili: boolean
}
export interface ServiziCreateState {
    isLoadingCreate: boolean,
    isErrorCreate: boolean
}

export interface ServiziUpdateState {
    isLoadingUpdate: boolean,
    isErrorUpdate: boolean
}

export interface ServiziDeleteState {
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}

export interface ServiziSceltiState {
    serviziScelti?: ServizioDTO[],
    isLoadingServiziScelti: boolean,
    isErrorServiziScelti: boolean
}