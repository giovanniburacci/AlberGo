import {testReducer} from './test/test.reducer';
import {combineReducers} from 'redux'
import {authReducer} from '../store/auth/auth.reducer';
import {prenotazioniReducer} from './prenotazioni/prenotazioni.reducer';
import {stanzeReducer} from './stanze/stanze.reducer';
import {categorieReducer} from './categorie/categorie.reducer';
import {clientiReducer} from './clienti/clienti.reducer';
import {hotelReducer} from './hotel/hotel.reducer';
import {serviziReducer} from './servizi/servizi.reducer';
import {cardReducer} from './card/card.reducer';
import {hotelsReducer} from './hotels/hotels.reducer';

const appReducer = combineReducers({
    ...testReducer,
    ...authReducer,
    ...prenotazioniReducer,
    ...stanzeReducer,
    ...categorieReducer,
    ...clientiReducer,
    ...hotelReducer,
    ...serviziReducer,
    ...cardReducer,
    ...hotelsReducer
});
export const RESET_STORE = 'RESET_STORE';
export const RESET_USER = 'RESET_USER';
export const RESET_ADMIN = 'RESET_USER';

export const rootReducer = (state:any, action: any) => {
    if(action.type === RESET_STORE) {
        state = undefined;
    }

    return appReducer(state,action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;