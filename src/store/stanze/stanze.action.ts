import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchStanze} from '../../api/stanze.service';

const stanzeLabels = {
    fetchStanze: 'fetchStanze'
}
const fetchStanze = createAsyncThunk(stanzeLabels.fetchStanze, async (hotelId:number) => {
    try {
        const resp = await searchStanze(hotelId)
        return resp.data;
    } catch(e) {
        console.log('fetchStanze request failed')
        throw e;
    }
});

export const stanzeActions = {
    fetchStanze
}

export default stanzeActions;