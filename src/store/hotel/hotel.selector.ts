import {RootState} from '../reducer.config';
import {AmministratoreDTO, HotelDTO} from '../../models/models';

const getHotel = (state:RootState): HotelDTO | undefined => state.hotel.hotel;

const getHotelId = (state:RootState): number | undefined => state && state.hotel.hotel && state.hotel.hotel.id;
const getAmministratore = (state:RootState): AmministratoreDTO | undefined => state.login.amministratore
export const hotelSelector = {
    getHotel,
    getAmministratore,
    getHotelId
}

export default hotelSelector;