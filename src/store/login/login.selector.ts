import {RootState} from '../reducer.config';

const getToken = (state:RootState) => state.login.token;

const getIdAmministratore = (state:RootState) => state.login.idAmministratore;

const getIdHotel = (state:RootState) => state.login.idHotel;

const getIsLoading = (state:RootState) => state.login.isLoading;

const getIsError = (state:RootState) => state.login.isError;

export const loginSelector = {
    getToken,
    getIdAmministratore,
    getIdHotel,
    getIsError,
    getIsLoading
}