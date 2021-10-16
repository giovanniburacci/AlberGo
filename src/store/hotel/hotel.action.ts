import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {HotelDTO} from '../../models/models';

const hotelLabels = {
    storeHotel: 'storeHotel',
    addStanza: 'addStanza'
}

const storeHotel = createAction(hotelLabels.storeHotel, (hotel:HotelDTO) => ({payload: hotel}));

const hotelActions = {
    storeHotel
}
export default hotelActions;