import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    searchServizi,
    createServizio,
    deleteServizio,
    updateServizio,
    searchServiziDisponibiliByPrenotazione,
    searchServiziByPrenotazione,
    deleteServizioInPrenotazione,
    insertServizioIntoPrenotazione
} from '../../api/servizi.service';
import {ServizioDTO} from '../../models/models';
import {RootState} from '../../store/reducer.config';

const serviziLabels = {
    fetchServizi: 'fetchServizi',
    addServizio: 'addServizio',
    removeServizio: 'removeServizio',
    editServizio: 'editServizio',
    fetchServiziDisponibiliByPrenotazione: 'fetchServiziDisponibiliByPrenotazione',
    fetchServiziSceltiByPrenotazione: 'fetchServiziSceltiByPrenotazione',
    removeServizioInPrenotazione: 'removeServizioInPrenotazione',
    addServizioToPrenotazione: 'addServizioToPrenotazione'
}

interface ServizioInPrenotazioneBean {
    prenotazioneId: number,
    servizioId:number
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

const fetchServiziDisponibiliByPrenotazione = createAsyncThunk(serviziLabels.fetchServiziDisponibiliByPrenotazione, async (prenotazioneId:number) => {
    try {
        const resp = await searchServiziDisponibiliByPrenotazione(prenotazioneId)
        return resp.data;
    } catch(e) {
        console.log('searchServiziDisponibiliByPrenotazione request failed')
        throw e;
    }
});

const fetchServiziSceltiByPrenotazione = createAsyncThunk(serviziLabels.fetchServiziSceltiByPrenotazione, async (prenotazioneId:number) => {
    try {
        const resp = await searchServiziByPrenotazione(prenotazioneId)
        return resp.data;
    } catch(e) {
        console.log('searchServiziByPrenotazione request failed')
        throw e;
    }
});

const addServizio = createAsyncThunk(serviziLabels.addServizio, async (servizio:Partial<ServizioDTO>, thunkAPI) => {
    try {
        const resp = await createServizio(servizio)
        if(servizio.idHotel) {
            thunkAPI.dispatch(fetchServizi(servizio.idHotel))
        }
    } catch(e) {
        console.log('addServizio request failed')
        throw e;
    }
});

const removeServizioFromPrenotazione = createAsyncThunk(serviziLabels.removeServizioInPrenotazione, async (bean:ServizioInPrenotazioneBean, thunkAPI) => {
    try {
        const {prenotazioneId, servizioId} = bean;
        const resp = await deleteServizioInPrenotazione(servizioId, prenotazioneId)
        thunkAPI.dispatch(fetchServiziDisponibiliByPrenotazione(prenotazioneId));
        thunkAPI.dispatch(fetchServiziSceltiByPrenotazione(prenotazioneId));
    } catch(e) {
        console.log('removeServizio request failed')
        throw e;
    }
});

const addServizioToPrenotazione = createAsyncThunk(serviziLabels.addServizioToPrenotazione, async (bean:ServizioInPrenotazioneBean, thunkAPI) => {
    try {
        const {prenotazioneId, servizioId} = bean;
        const state = thunkAPI.getState() as RootState;
        const hotelId = state.hotel.hotel.id;
        const resp = await insertServizioIntoPrenotazione(servizioId, prenotazioneId, hotelId)
        thunkAPI.dispatch(fetchServiziDisponibiliByPrenotazione(prenotazioneId));
        thunkAPI.dispatch(fetchServiziSceltiByPrenotazione(prenotazioneId));
    } catch(e) {
        console.log('addServizioToPrenotazione request failed')
        throw e;
    }
});

const removeServizio = createAsyncThunk(serviziLabels.removeServizio, async (servizio:ServizioDTO, thunkAPI) => {
    try {
        const resp = await deleteServizio(servizio.id)
        thunkAPI.dispatch(fetchServizi(servizio.idHotel));
        return
            ;
    } catch(e) {
        console.log('removeServizio request failed')
        throw e;
    }
});

const editServizio = createAsyncThunk(serviziLabels.editServizio, async (servizio:ServizioDTO, thunkAPI) => {
    try {
        const resp = await updateServizio(servizio)
        thunkAPI.dispatch(fetchServizi(servizio.idHotel))
    } catch(e) {
        console.log('addServizio request failed')
        throw e;
    }
});

export const serviziActions = {
    fetchServizi,
    addServizio,
    removeServizio,
    editServizio,
    fetchServiziDisponibiliByPrenotazione,
    fetchServiziSceltiByPrenotazione,
    removeServizioFromPrenotazione,
    addServizioToPrenotazione
}

export default serviziActions;