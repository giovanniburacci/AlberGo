import {StanzaDTO} from '../../models/models';

export interface StanzeState {
    stanze?: StanzaDTO[]
    isLoading: boolean,
    isError: boolean
}