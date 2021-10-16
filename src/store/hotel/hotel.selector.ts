import {RootState} from '../reducer.config';
import {HotelDTO} from '../../models/models';

const getHotel = (state:RootState): HotelDTO => state.hotel.hotel;

export const hotelSelector = {
    getHotel
}

export default hotelSelector;