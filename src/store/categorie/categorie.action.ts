import {createAsyncThunk} from '@reduxjs/toolkit';
import {createCategoria, searchCategorie, searchFilteredByNome} from '../../api/categorie.service';
import {CategoriaDTO, FetchCategorieWithName} from '../../models/models';
import {searchNumeroStanzeForCategoria} from '../../api/stanze.service';
import {NumeroStanze} from './types';
import {RootState} from '../reducer.config';

const categorieLabels = {
    fetchCategorie: 'fetchCategorie',
    addCategoria: 'addCategoria',
    fetchFilteredCategorie: 'fetchFilteredCategorie',
    fetchNumeroStanzeForCategoria: 'fetchNumeroStanzeForCategoria'
}
const fetchCategorie = createAsyncThunk(categorieLabels.fetchCategorie, async (hotelId:number, thunkAPI) => {
    try {
        const resp = await searchCategorie(hotelId)
        thunkAPI.dispatch(fetchNumeroStanzeForCategoria(resp.data))
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

const fetchFilteredCategorie = createAsyncThunk(categorieLabels.fetchFilteredCategorie, async (params: FetchCategorieWithName, thunkAPI) => {
    try {
        const resp = await searchFilteredByNome(params)
        return resp.data;
    } catch(e) {
        console.log('fetchFilteredCategorie request failed')
        throw e;
    }
});

const fetchNumeroStanzeForCategoria = createAsyncThunk(categorieLabels.fetchNumeroStanzeForCategoria, async (categorie: CategoriaDTO[], thunkAPI) => {
    try {
        const numeroStanze: NumeroStanze[] = []

        for(const c of categorie) {
            const num = await searchNumeroStanzeForCategoria(c.id)
            numeroStanze.push({
                [c.id]: num.data
            })
        }
        return numeroStanze;
    } catch(e) {
        console.log('fetchNumeroStanzeForCategoria request failed')
        throw e;
    }
});

export const categorieActions = {
    fetchCategorie,
    addCategoria,
    fetchFilteredCategorie,
    fetchNumeroStanzeForCategoria
}

export default categorieActions;