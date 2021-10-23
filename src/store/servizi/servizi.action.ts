import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchServizi, createServizio, deleteServizio, updateServizio} from '../../api/servizi.service';
import {ServizioDTO} from '../../models/models';

const serviziLabels = {
    fetchServizi: 'fetchServizi',
    addServizio: 'addServizio',
    removeServizio: 'removeServizio',
    editServizio: 'editServizio'
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

const removeServizio = createAsyncThunk(serviziLabels.removeServizio, async (servizio:ServizioDTO, thunkAPI) => {
    try {
        const resp = await deleteServizio(servizio.id)
        thunkAPI.dispatch(fetchServizi(servizio.idHotel))
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
    editServizio
}

export default serviziActions;