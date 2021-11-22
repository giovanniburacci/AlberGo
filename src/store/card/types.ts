import {CardDataDTO} from '../../models/models';

export interface CardState {
    card?: CardDataDTO,
    isLoading: boolean,
    isError: boolean
}