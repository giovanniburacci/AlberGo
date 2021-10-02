import {testReducer} from './test/test.reducer';
import {combineReducers} from 'redux'
import {loginReducer} from './login/login.reducer';
import {prenotazioniReducer} from './prenotazioni/prenotazioni.reducer';
import {stanzeReducer} from './stanze/stanze.reducer';
import {categorieReducer} from './categorie/categorie.reducer';

const appReducer = combineReducers({
    ...testReducer,
    ...loginReducer,
    ...prenotazioniReducer,
    ...stanzeReducer,
    ...categorieReducer
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