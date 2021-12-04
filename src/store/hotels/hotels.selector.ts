import {RootState} from '../reducer.config';
import {HotelDTO} from '../../models/models';

const getHotels = (state:RootState): HotelDTO[] | undefined => state.hotels.hotels;

const getIsLoading = (state:RootState): boolean => state.hotels.isLoading;

const getIsError = (state:RootState): boolean => state.hotels.isError;

export const hotelsSelector = {
    getHotels,
    getIsError,
    getIsLoading
}