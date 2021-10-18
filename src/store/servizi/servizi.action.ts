import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchServizi} from '../../api/servizi.service';

const serviziLabels = {
    fetchServizi: 'fetchServizi'
}
const fetchServizi = createAsyncThunk(serviziLabels.fetchServizi, async (hotelId:number) => {
    try {
        const resp = await searchServizi(hotelId)
        return resp.data;
    } catch(e) {
        console.log('searchServizi request failed')
        throw e;
    }
});

export const serviziActions = {
    fetchServizi
}

export default serviziActions;