import {createAsyncThunk} from '@reduxjs/toolkit';
import {createPrenotazione, searchPrenotazioni} from '../../api/prenotazioni.service';
import {PrenotazioneDTO} from '../../models/models';

const prenotazioniLabels = {
    fetchPrenotazioni: 'fetchPrenotazioni',
    addPrenotazione: 'addPrenotazione'
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

const addPrenotazione = createAsyncThunk(prenotazioniLabels.addPrenotazione, async (categoria: Partial<PrenotazioneDTO>, thunkAPI) => {
    try {
        const resp = await createPrenotazione(categoria)
        if(categoria.idHotel) {
            thunkAPI.dispatch(fetchPrenotazioni(categoria.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('fetchCategorie request failed')
        throw e;
    }
});
export const prenotazioniActions = {
    fetchPrenotazioni,
    addPrenotazione
}

export default prenotazioniActions;