import {createReducer} from '@reduxjs/toolkit';
import {HotelState} from './types';
import hotelActions from './hotel.action';
import loginActions from '../auth/auth.action';
import {HotelDTO} from '../../models/models';

let initialHotel :HotelDTO | undefined = undefined;
const storedHotelData = localStorage.getItem('hotelData');
if(storedHotelData) {
    initialHotel = JSON.parse(storedHotelData);
}
const initialState: HotelState = {
    hotel: initialHotel
}

export const hotelReducer = {
    hotel: createReducer(initialState, (builder) => {
        builder.addCase(hotelActions.storeHotel, (state, action) => {
            localStorage.setItem('hotelData', JSON.stringify(action.payload))
            state.hotel = action.payload
        }).addCase(loginActions.adminLogoutAction, (state) => {
            localStorage.removeItem('hotelData');
            state.hotel = undefined;
        })
    })
}