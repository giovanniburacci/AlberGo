import {createAsyncThunk} from '@reduxjs/toolkit';
import {createStanza, searchStanze} from '../../api/stanze.service';
import {StanzaDTO} from '../../models/models';

const stanzeLabels = {
    fetchStanze: 'fetchStanze',
    addStanza: 'addStanza'
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

const addStanza = createAsyncThunk(stanzeLabels.addStanza, async (stanza: Partial<StanzaDTO>, thunkAPI) => {
    try {
        const resp = await createStanza(stanza)
        console.log(resp);
        if(stanza.idHotel) {
            thunkAPI.dispatch(stanzeActions.fetchStanze(stanza.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('fetchStanze request failed')
        throw e;
    }
});

export const stanzeActions = {
    fetchStanze,
    addStanza
}

export default stanzeActions;