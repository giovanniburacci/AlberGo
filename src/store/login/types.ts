import {AmministratoreDTO, ClienteDTO} from '../../models/models';

export interface LoginData {
    userToken?: string,
    adminToken?: string,
    isLoading: boolean,
    isError: boolean,
    amministratore?: AmministratoreDTO
    user?: ClienteDTO
}