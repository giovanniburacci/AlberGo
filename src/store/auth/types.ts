import {AmministratoreDTO, ClienteDTO} from '../../models/models';

export interface LoginData extends LoginDataRegisterState, AdminLoginState, UserLoginState{
    userToken?: string,
    adminToken?: string,
    isLoading: boolean,
    isError: boolean,
    amministratore?: AmministratoreDTO
    user?: ClienteDTO,
    userExpiration: string,
    adminExpiration: string
}

export interface AdminLoginState {
    isLoadingAdminLogin: boolean,
    isErrorAdminLogin: boolean
}

export interface UserLoginState {
    isLoadingUserLogin: boolean,
    isErrorUserLogin: boolean
}


interface LoginDataRegisterState {
    isLoadingRegister: boolean,
    isErrorRegister: boolean
}