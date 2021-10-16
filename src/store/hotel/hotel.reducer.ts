import {createReducer} from '@reduxjs/toolkit';
import {HotelState} from './types';
import {getHotelStub} from '../../mocks/stubs/hotel';
import hotelActions from './hotel.action';

const initialState: HotelState = {
    hotel: getHotelStub()
}

export const hotelReducer = {
    hotel: createReducer(initialState, (builder) => {
        builder.addCase(hotelActions.storeHotel, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
    })
}