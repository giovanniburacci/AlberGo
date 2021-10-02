import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchCategorie} from '../../api/categorie.service';

const categorieLabels = {
    fetchCategorie: 'fetchCategorie'
}
const fetchCategorie = createAsyncThunk(categorieLabels.fetchCategorie, async (hotelId:number) => {
    try {
        const resp = await searchCategorie(hotelId)
        return resp.data;
    } catch(e) {
        console.log('fetchCategorie request failed')
        throw e;
    }
});

export const categorieActions = {
    fetchCategorie
}

export default categorieActions;