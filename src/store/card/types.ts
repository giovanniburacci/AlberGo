import {CardDataDTO} from '../../models/models';

export interface CardState extends CardCreateState, CardDeleteState {
    card?: CardDataDTO,
    isLoading: boolean,
    isError: boolean
}

export interface CardCreateState {
    isLoadingCreate: boolean,
    isErrorCreate: boolean
}

export interface CardDeleteState {
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}