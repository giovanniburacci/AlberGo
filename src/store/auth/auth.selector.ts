import {RootState} from '../reducer.config';

const getAdminToken = (state:RootState) => state.login.adminToken;

const getUserToken = (state:RootState) => state.login.userToken;

const getIdAmministratore = (state:RootState) => state.login.amministratore?.id;

const getIdHotel = (state:RootState) => state.login.amministratore?.idHotel;

const getAmministratore = (state:RootState) => state.login.amministratore

const getUser = (state:RootState) => state.login.user

const getIdUser = (state:RootState) => state.login.user?.id

const getIsLoading = (state:RootState) => state.login.isLoading;

const getIsError = (state:RootState) => state.login.isError;

const getIsLoadingAdminLogin = (state:RootState) => state.login.isLoadingAdminLogin;

const getIsErrorAdminLogin = (state:RootState) => state.login.isErrorAdminLogin;

const getIsLoadingUserLogin = (state:RootState) => state.login.isLoadingUserLogin;

const getIsErrorUserLogin = (state:RootState) => state.login.isErrorAdminLogin;

export const authSelector = {
    getAdminToken,
    getUserToken,
    getIdAmministratore,
    getAmministratore,
    getIdHotel,
    getIsError,
    getIsLoading,
    getUser,
    getIdUser,
    getIsLoadingAdminLogin,
    getIsLoadingUserLogin,
    getIsErrorAdminLogin,
    getIsErrorUserLogin
}