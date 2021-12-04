import {createReducer} from '@reduxjs/toolkit';
import {hotelsActions} from '../../store/hotels/hotels.action';
import {HotelsState} from './types';

const initialState: HotelsState = {
    isLoading: false,
    isError: false
}
export const hotelsReducer = {
    hotels: createReducer(initialState, (builder) => {
        builder.addCase(hotelsActions.fetchHotels.fulfilled, ((state, action) => {
            return {
                ...state,
                hotels: action.payload,
                isLoading: false,
                isError: false
            }
        })).addCase(hotelsActions.fetchHotels.pending, ((state, action) => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        })).addCase(hotelsActions.fetchHotels.rejected, ((state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }))
    })
}