import {AmministratoreDTO, ClienteDTO} from '../../models/models';

export interface LoginData extends LoginDataRegisterState{
    userToken?: string,
    adminToken?: string,
    isLoading: boolean,
    isError: boolean,
    amministratore?: AmministratoreDTO
    user?: ClienteDTO
}

interface LoginDataRegisterState {
    isLoadingRegister: boolean,
    isErrorRegister: boolean
}