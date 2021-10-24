import {StanzaDTO} from '../../models/models';

export interface StanzeState extends StanzeEditState, StanzeDeleteState{
    stanze?: StanzaDTO[]
    isLoading: boolean,
    isError: boolean,
    isLoadingNewStanza: boolean,
    isErrorNewStanza: boolean
}

export interface StanzeEditState {
    isLoadingEdit: boolean,
    isErrorEdit: boolean
}

export interface StanzeDeleteState {
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}
