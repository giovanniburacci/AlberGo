import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    createPrenotazione,
    deletePrenotazione, searchFilteredByUtenteAndDate,
    searchPrenotazioni,
    updatePrenotazione
} from '../../api/prenotazioni.service';
import {FilterBean, PrenotazioneDTO} from '../../models/models';

const prenotazioniLabels = {
    fetchPrenotazioni: 'fetchPrenotazioni',
    addPrenotazione: 'addPrenotazione',
    editPrenotazione: 'editPrenotazione',
    removePrenotazione: 'removePrenotazione',
    fetchFilteredPrenotazioni: 'fetchFilteredPrenotazioni'
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

const fetchFilteredPrenotazioni = createAsyncThunk(prenotazioniLabels.fetchFilteredPrenotazioni, async (searchBean:FilterBean) => {
    try {
        const resp = await searchFilteredByUtenteAndDate(searchBean)
        return resp.data;
    } catch(e) {
        console.log('fetchFilteredPrenotazioni request failed')
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
        console.log('createPrenotazione request failed')
        throw e;
    }
});

const editPrenotazione = createAsyncThunk(prenotazioniLabels.editPrenotazione, async (prenotazione: PrenotazioneDTO, thunkAPI) => {
    try {
        await updatePrenotazione(prenotazione)
        thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
    } catch(e) {
        console.log('editPrenotazione request failed')
        throw e;
    }
});

const removePrenotazione = createAsyncThunk(prenotazioniLabels.removePrenotazione, async (prenotazione: PrenotazioneDTO, thunkAPI) => {
    try {
        await deletePrenotazione(prenotazione.id)
        if(prenotazione.idHotel) {
            thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
        }
        return {};
    } catch(e) {
        console.log('editPrenotazione request failed')
        throw e;
    }
});

export const prenotazioniActions = {
    fetchPrenotazioni,
    addPrenotazione,
    editPrenotazione,
    removePrenotazione,
    fetchFilteredPrenotazioni
}

export default prenotazioniActions;