import {RootState} from '../reducer.config';
import {loginReducer} from './login.reducer';

const getToken = (state:RootState) => state.login.token;

const getIdAmministratore = (state:RootState) => state.login.idAmministratore;

const getIdHotel = (state:RootState) => state.login.idHotel;

export const loginSelector = {
    getToken,
    getIdAmministratore,
    getIdHotel
}