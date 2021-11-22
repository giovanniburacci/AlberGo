import {RootState} from '../reducer.config';

const getToken = (state:RootState) => state.login.token;

const getIdAmministratore = (state:RootState) => state.login.amministratore?.id;

const getIdHotel = (state:RootState) => state.login.amministratore?.idHotel;

const getAmministratore = (state:RootState) => state.login.amministratore

const getUser = (state:RootState) => state.login.user

const getIdUser = (state:RootState) => state.login.user?.id

const getIsLoading = (state:RootState) => state.login.isLoading;

const getIsError = (state:RootState) => state.login.isError;

export const loginSelector = {
    getToken,
    getIdAmministratore,
    getAmministratore,
    getIdHotel,
    getIsError,
    getIsLoading,
    getUser,
    getIdUser
}