import {HotelDTO} from '../../models/models';

export interface HotelsState {
    hotels?: HotelDTO[]
    isLoading: boolean,
    isError: boolean
}