import {createAsyncThunk} from '@reduxjs/toolkit';
import {mockedAddCard, mockedDeleteCard, mockedSearchCard} from '../../mocks/api';
import {CardDataDTO} from '../../models/models';

const cardLabels = {
    fetchCard: 'fetchCard',
    removeCard: 'removeCard',
    addCard: 'addCard'
}

const fetchCard = createAsyncThunk(cardLabels.fetchCard, async (userId:number, thunkAPI) => {
    try {
        const resp = await mockedSearchCard(userId)
        return resp;
    } catch(e) {
        console.log('fetchCard request failed')
        throw e;
    }
});

const removeCard = createAsyncThunk(cardLabels.removeCard, async (cardId:number, thunkAPI) => {
    try {
        const resp = await mockedDeleteCard()
        return {};
    } catch(e) {
        console.log('removeCard request failed')
        throw e;
    }
});

const addCard = createAsyncThunk(cardLabels.addCard, async (card: Partial<CardDataDTO>, thunkAPI) => {
    try {
        const resp = await mockedAddCard(card)
        return resp;
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