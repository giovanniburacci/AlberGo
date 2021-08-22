// @ts-ignore
import {configureStore, ThunkAction, getDefaultMiddleware, Action} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './reducer.config';
import { enableES5 } from 'immer';
enableES5();

const middleware = [
    ...getDefaultMiddleware()
]

export const store = configureStore({
  reducer: rootReducer,
  middleware
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
