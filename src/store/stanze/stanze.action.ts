import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    createStanza,
    deleteStanza,
    searchStanze,
    searchStanzeLibereWithDates,
    updateStanza
} from '../../api/stanze.service';
import {StanzaDTO} from '../../models/models';
import moment from 'moment';

const stanzeLabels = {
    fetchStanze: 'fetchStanze',
    addStanza: 'addStanza',
    fetchStanzeLibereWithDates: 'fetchStanzeLibereWithDates',
    editStanza: 'editStanza',
    removeStanza: 'removeStanza'
}

export interface FetchWithDatesBean {
    idHotel:number,
    dataInizio: moment.Moment,
    dataFine: moment.Moment
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

const fetchStanzeLibereWithDates = createAsyncThunk(stanzeLabels.fetchStanzeLibereWithDates, async (params: FetchWithDatesBean) => {
    try {
        if(params.dataFine && params.dataInizio) {
            const resp = await searchStanzeLibereWithDates(params);
            return resp.data;
        } else {
            const resp = await searchStanze(params.idHotel);
            return resp.data;
        }
    } catch(e) {
        console.log('fetchStanzeLibereWithDates request failed')
        throw e;
    }
});

const addStanza = createAsyncThunk(stanzeLabels.addStanza, async (stanza: Partial<StanzaDTO>, thunkAPI) => {
    try {
        const resp = await createStanza(stanza)
        if(stanza.idHotel) {
            thunkAPI.dispatch(stanzeActions.fetchStanze(stanza.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('fetchStanze request failed')
        throw e;
    }
});

const editStanza = createAsyncThunk(stanzeLabels.editStanza, async (stanza: StanzaDTO, thunkAPI) => {
    try {
        const resp = await updateStanza(stanza)
        if(stanza.idHotel) {
            thunkAPI.dispatch(stanzeActions.fetchStanze(stanza.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('updateStanza request failed')
        throw e;
    }
});

// @ts-ignore
const removeStanza = createAsyncThunk<StanzaDTO>(stanzeLabels.removeStanza, async (stanza: StanzaDTO, thunkAPI) => {
    try {
        const resp = await deleteStanza(stanza.id)
        if(stanza.idHotel) {
            thunkAPI.dispatch(stanzeActions.fetchStanze(stanza.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('deleteStanza request failed')
        throw e;
    }
});

export const stanzeActions = {
    fetchStanze,
    addStanza,
    fetchStanzeLibereWithDates,
    editStanza,
    removeStanza
}

export default stanzeActions;