import {createAsyncThunk} from '@reduxjs/toolkit';
import {CardDataDTO} from '../../models/models';
import {createCard, deleteCard, searchCard} from '../../api/stripe.service';

const cardLabels = {
    fetchCard: 'fetchCard',
    removeCard: 'removeCard',
    addCard: 'addCard'
}

const fetchCard = createAsyncThunk(cardLabels.fetchCard, async (userId:number, thunkAPI) => {
    try {
        const resp = await searchCard(userId)
        return resp.data;
    } catch(e) {
        console.log('fetchCard request failed')
        throw e;
    }
});

const removeCard = createAsyncThunk(cardLabels.removeCard, async (idCliente:number, thunkAPI) => {
    try {
        await deleteCard(idCliente)
        return ;
    } catch(e) {
        console.log('removeCard request failed')
        throw e;
    }
});

const addCard = createAsyncThunk(cardLabels.addCard, async (card: Partial<CardDataDTO>, thunkAPI) => {
    try {
        await createCard(card)
        return card as CardDataDTO;
    } catch(e) {
        console.log('addCard request failed')
        throw e;
    }
});


export const CardActions = {
    fetchCard,
    removeCard,
    addCard
}

export default CardActions;