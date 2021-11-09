import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    createPrenotazione,
    deletePrenotazione, searchFilteredByUtenteAndDate,
    searchPrenotazioni,
    updatePrenotazione
} from '../../api/prenotazioni.service';
import {FilterBean, PrenotazioneDTO, ServizioDTO} from '../../models/models';
import {insertServizioIntoPrenotazione} from '../../api/servizi.service';

interface AddPrenotazioneBean {
    prenotazione: Partial<PrenotazioneDTO>,
    servizi: ServizioDTO[],
    idHotel: number
}
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

const addPrenotazione = createAsyncThunk(prenotazioniLabels.addPrenotazione, async (prenotazioneBean: AddPrenotazioneBean, thunkAPI) => {
    try {
        const {prenotazione, servizi, idHotel} = prenotazioneBean;
        const resp = await createPrenotazione(prenotazione)
        for(const s of servizi) {
            await insertServizioIntoPrenotazione(s.id, resp.data.id, idHotel)
        }
        if(prenotazione.idHotel) {
            thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
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