import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
    createStanza,
    deleteStanza,
    searchStanze,
    searchStanzeLibereWithDates,
    searchStanzeOccupateWithDates,
    updateStanza
} from '../../api/stanze.service';
import {StanzaDTO} from '../../models/models';
import moment from 'moment';
import {mapStanze} from './stanze.mapper';
import {StanzaStatus} from './types';

const stanzeLabels = {
    fetchStanze: 'fetchStanze',
    addStanza: 'addStanza',
    fetchStanzeWithDates: 'fetchStanzeLibereWithDates',
    editStanza: 'editStanza',
    removeStanza: 'removeStanza',
    filterBySelectedCategoria: 'filterBySelectedCategoria'
}

export interface FetchWithDatesBean {
    idHotel:number,
    dataInizio: moment.Moment,
    dataFine: moment.Moment,
    idCategoria?: number
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

const fetchStanzeWithDates = createAsyncThunk(stanzeLabels.fetchStanzeWithDates, async (params: FetchWithDatesBean) => {
    try {
        if(params.dataFine && params.dataInizio) {
            const stanzeLibere = await searchStanzeLibereWithDates(params);
            const stanzeLibereMapped = mapStanze(stanzeLibere.data, StanzaStatus.LIBERA)

            const stanzeOccupate = await searchStanzeOccupateWithDates(params);
            const stanzeOccupateMapped = mapStanze(stanzeOccupate.data, StanzaStatus.OCCUPATA)

            return [...stanzeLibereMapped, ...stanzeOccupateMapped]
        } else {
            const stanze = await searchStanze(params.idHotel);
            return stanze.data;
        }
    } catch(e) {
        console.log('fetchStanzeWithDates request failed')
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

const filterBySelectedCategoria = createAction(stanzeLabels.filterBySelectedCategoria, (idCategoria?: number) => {
    return {
        payload: {
            idCategoria
        }
    }
})
export const stanzeActions = {
    fetchStanze,
    addStanza,
    fetchStanzeWithDates,
    editStanza,
    removeStanza,
    filterBySelectedCategoria
}

export default stanzeActions;