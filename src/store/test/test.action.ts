import {createAction, createAsyncThunk} from '@reduxjs/toolkit'

export const testAction = 'testAction';

export const testActionRequest = createAction(testAction);

