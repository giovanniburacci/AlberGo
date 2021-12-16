import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    createPrenotazione,
    deletePrenotazione, searchByCliente, searchFilteredByUtenteAndDate,
    searchPrenotazioni,
    updatePrenotazione
} from '../../api/prenotazioni.service';
import {FilterBean, PrenotazioneDTO, ServizioDTO} from '../../models/models';
import {insertServizioIntoPrenotazione} from '../../api/servizi.service';
import {RootState} from '../reducer.config';

interface AddPrenotazioneBean {
    prenotazione: Partial<PrenotazioneDTO>,
    servizi: ServizioDTO[],
}
const prenotazioniLabels = {
    fetchPrenotazioni: 'fetchPrenotazioni',
    addPrenotazione: 'addPrenotazione',
    editPrenotazione: 'editPrenotazione',
    removePrenotazione: 'removePrenotazione',
    fetchFilteredPrenotazioni: 'fetchFilteredPrenotazioni',
    fetchPrenotazioniByCliente: 'fetchPrenotazioniByCliente'
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

const fetchPrenotazioniByCliente = createAsyncThunk(prenotazioniLabels.fetchPrenotazioniByCliente, async (idCliente:number) => {
    try {
        const resp = await searchByCliente(idCliente)
        return resp.data;
    } catch(e) {
        console.log('fetchPrenotazioniByCliente request failed')
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
        const {prenotazione, servizi} = prenotazioneBean;
        const resp = await createPrenotazione(prenotazione)
        for(const s of servizi) {
            await insertServizioIntoPrenotazione(s.id, resp.data.id, prenotazione.idHotel!)
        }
        const state = thunkAPI.getState() as RootState;
        const isAdmin = !!state.login.amministratore
        if(prenotazione.idHotel) {
            if(isAdmin) {
                thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
            } else {
                thunkAPI.dispatch(fetchPrenotazioniByCliente(prenotazione.idHotel))
            }
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
        const state = thunkAPI.getState() as RootState;
        const isAdmin = !!state.login.amministratore
        if(isAdmin) {
            thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
        } else {
            thunkAPI.dispatch(fetchPrenotazioniByCliente(prenotazione.idHotel))
        }
    } catch(e) {
        console.log('editPrenotazione request failed')
        throw e;
    }
});

const removePrenotazione = createAsyncThunk(prenotazioniLabels.removePrenotazione, async (prenotazione: PrenotazioneDTO, thunkAPI) => {
    try {
        await deletePrenotazione(prenotazione.id)
        const state = thunkAPI.getState() as RootState;
        const isAdmin = !!state.login.amministratore
        if(isAdmin) {
            thunkAPI.dispatch(fetchPrenotazioni(prenotazione.idHotel));
        } else {
            thunkAPI.dispatch(fetchPrenotazioniByCliente(prenotazione.idHotel))
        }
        return;
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
    fetchFilteredPrenotazioni,
    fetchPrenotazioniByCliente
}

export default prenotazioniActions;