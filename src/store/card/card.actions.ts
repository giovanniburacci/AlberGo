import {createAsyncThunk} from '@reduxjs/toolkit';
import {mockedSearchCard} from '../../mocks/api';

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

export const CardActions = {
    fetchCard
}

export default CardActions;