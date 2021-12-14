import {createReducer} from '@reduxjs/toolkit';
import {HotelState} from './types';
import hotelActions from './hotel.action';

const initialState: HotelState = {
}

export const hotelReducer = {
    hotel: createReducer(initialState, (builder) => {
        builder.addCase(hotelActions.storeHotel, (state, action) => {
            state.hotel = action.payload
        })
    })
}