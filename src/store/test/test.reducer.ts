import {createReducer} from '@reduxjs/toolkit';
import {testActionRequest} from './test.action';

const initialState = {
    loggedIn: false
}

export const testReducer = {
    test: createReducer(initialState, (builder) => {
        builder.addCase(testActionRequest, (state,action) => {
            console.log(action.type);
            return {
                ...state,
                loggedIn: !state.loggedIn
            }
        })
    })
}