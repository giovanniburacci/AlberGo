import {RootState} from '../reducer.config';
import {StanzaDTO} from '../../models/models';

const getStanze = (state:RootState): StanzaDTO[] | undefined => state.stanze.stanze;

const getIsError = (state:RootState): boolean => state.stanze.isError;

const getIsLoading = (state:RootState): boolean => state.stanze.isLoading;

const getIsLoadingEdit = (state:RootState): boolean => state.stanze.isLoadingEdit;

export const stanzeSelector = {
    getStanze,
    getIsError,
    getIsLoading,
    getIsLoadingEdit
}

export default stanzeSelector;