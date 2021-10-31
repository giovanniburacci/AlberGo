import {StanzaDTO} from '../../models/models';
import moment from 'moment';

export interface StanzeState extends StanzeEditState, StanzeDeleteState{
    stanze?: StanzaWithStatus[]
    isLoading: boolean,
    isError: boolean,
    isLoadingNewStanza: boolean,
    isErrorNewStanza: boolean,
    categoriaFilter?: number,
    filteringDates?: moment.Moment[]
}

export interface StanzaWithStatus extends StanzaDTO {
    status?: StanzaStatus
}

export interface StanzeEditState {
    isLoadingEdit: boolean,
    isErrorEdit: boolean
}

export interface StanzeDeleteState {
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}

export enum StanzaStatus {
    OCCUPATA = 'occupata',
    LIBERA = 'libera'
}
