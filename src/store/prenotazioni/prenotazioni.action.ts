import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchPrenotazioni} from '../../api/prenotazioni.service';

const prenotazioniLabels = {
    fetchPrenotazioni: 'fetchPrenotazioni'
}
const fetchPrenotazioni = createAsyncThunk(prenotazioniLabels.fetchPrenotazioni, async (hotelId:number) => {
    try {
        const resp = await searchPrenotazioni(hotelId)
        return resp.data;
    } catch(e) {
        console.log('fetchPrenotazioni request failed')
        throw e;
    }
});

export const prenotazioniActions = {
    fetchPrenotazioni
}

export default prenotazioniActions;