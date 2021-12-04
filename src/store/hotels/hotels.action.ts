import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchHotels} from '../../api/hotels.service';

const hotelsLabels = {
    fetchHotels: 'fetchHotels',
}

const fetchHotels = createAsyncThunk(hotelsLabels.fetchHotels, async () => {
    try {
        const resp = await searchHotels()
        return resp.data;
    } catch(e) {
        console.log('fetchHotels request failed')
        throw e;
    }
});

export const hotelsActions = {
    fetchHotels
}