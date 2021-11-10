import {RootState} from '../reducer.config';
import {AmministratoreDTO, HotelDTO} from '../../models/models';

const getHotel = (state:RootState): HotelDTO => state.hotel.hotel;

const getHotelId = (state:RootState): number => state.hotel.hotel.id;
const getAmministratore = (state:RootState): AmministratoreDTO => state.hotel.amministratore
export const hotelSelector = {
    getHotel,
    getAmministratore,
    getHotelId
}

export default hotelSelector;