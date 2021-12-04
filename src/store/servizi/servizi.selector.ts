import {RootState} from '../reducer.config';
import {ServizioDTO} from '../../models/models';

const getServizi = (state:RootState): ServizioDTO[] | undefined => state.servizi.servizi;

const getServiziDisponibili = (state:RootState): ServizioDTO[] | undefined => state.servizi.serviziDisponibili;

const getIsLoadingServiziDisponibili = (state:RootState): boolean => state.servizi.isLoadingServiziDisponibili;

const getIsErrorServiziDisponibili = (state:RootState): boolean => state.servizi.isErrorServiziDisponibili;

const getServiziScelti = (state:RootState): ServizioDTO[] | undefined => state.servizi.serviziScelti;

const getIsLoadingServiziScelti = (state:RootState): boolean => state.servizi.isLoadingServiziScelti;

const getIsErrorServiziScelti = (state:RootState): boolean => state.servizi.isErrorServiziScelti;

const getIsError = (state:RootState): boolean => state.servizi.isError;

const getIsLoading = (state:RootState): boolean => state.servizi.isLoading;

const getIsErrorCreate = (state:RootState): boolean => state.servizi.isErrorCreate;

const getIsLoadingCreate = (state:RootState): boolean => state.servizi.isLoadingCreate;

const getIsErrorEdit = (state:RootState): boolean => state.servizi.isErrorUpdate;

const getIsLoadingEdit = (state:RootState): boolean => state.servizi.isLoadingUpdate;

const getIsErrorDelete = (state:RootState): boolean => state.servizi.isErrorDelete;

const getIsLoadingDelete = (state:RootState): boolean => state.servizi.isLoadingDelete;

export const serviziSelector = {
    getServizi,
    getIsError,
    getIsLoading,
    getIsErrorCreate,
    getIsLoadingCreate,
    getServiziScelti,
    getServiziDisponibili,
    getIsErrorServiziScelti,
    getIsErrorServiziDisponibili,
    getIsLoadingServiziScelti,
    getIsLoadingServiziDisponibili,
    getIsErrorDelete,
    getIsErrorEdit,
    getIsLoadingDelete,
    getIsLoadingEdit
}

export default serviziSelector;