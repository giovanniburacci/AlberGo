import {AmministratoreDTO, ClienteDTO} from '../../models/models';

export interface LoginData {
    token?: string,
    isLoading: boolean,
    isError: boolean,
    amministratore?: AmministratoreDTO
    user?: ClienteDTO
}