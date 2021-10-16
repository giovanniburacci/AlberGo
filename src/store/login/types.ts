import {AmministratoreDTO} from '../../models/models';

export interface AmministratoreLogin {
    token?: string,
    isLoading: boolean,
    isError: boolean,
    amministratore: AmministratoreDTO
}