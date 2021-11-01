import {createAsyncThunk} from '@reduxjs/toolkit';
import {filterClientiByNomeCognome, searchClienti} from '../../api/clienti.service';

const clientiLabels = {
    fetchClienti: 'fetchClienti',
    fetchFilteredClienti: 'fetchFilteredClienti'
}

export interface FetchClientiBean {
    nome?: string,
    cognome?: string,
    idHotel: number
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

const fetchFilteredClienti = createAsyncThunk(clientiLabels.fetchFilteredClienti, async (filterBean:FetchClientiBean) => {
    try {
        const resp = await filterClientiByNomeCognome(filterBean)
        return resp.data;
    } catch(e) {
        console.log('searchPrenotazioni request failed')
        throw e;
    }
});
export const clientiActions = {
    fetchClienti,
    fetchFilteredClienti
}

export default clientiActions;