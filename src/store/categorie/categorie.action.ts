import {createAsyncThunk} from '@reduxjs/toolkit';
import {createCategoria, searchCategorie} from '../../api/categorie.service';
import {CategoriaDTO} from '../../models/models';

const categorieLabels = {
    fetchCategorie: 'fetchCategorie',
    addCategoria: 'addCategoria'
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

const addCategoria = createAsyncThunk(categorieLabels.addCategoria, async (categoria: Partial<CategoriaDTO>, thunkAPI) => {
    try {
        const resp = await createCategoria(categoria)
        if(categoria.idHotel) {
            thunkAPI.dispatch(fetchCategorie(categoria.idHotel));
        }
        return resp.data;
    } catch(e) {
        console.log('fetchCategorie request failed')
        throw e;
    }
});

export const categorieActions = {
    fetchCategorie,
    addCategoria
}

export default categorieActions;