import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchClienti} from '../../api/clienti.service';

const clientiLabels = {
    fetchClienti: 'fetchClienti'
}
const fetchClienti = createAsyncThunk(clientiLabels.fetchClienti, async (hotelId:number) => {
    try {
        const resp = await searchClienti(hotelId)
        return resp.data;
    } catch(e) {
        console.log('searchPrenotazioni request failed')
        throw e;
    }
});

export const clientiActions = {
    fetchClienti
}

export default clientiActions;