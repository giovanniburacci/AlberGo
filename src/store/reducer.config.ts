import {testReducer} from './test/test.reducer';
import {combineReducers} from 'redux'
const appReducer = combineReducers({
    ...testReducer

});
export const RESET_STORE = 'RESET_STORE';

export const rootReducer = (state:any, action: any) => {
    if(action.type === RESET_STORE) {
        state = undefined;
    }

    return appReducer(state,action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;