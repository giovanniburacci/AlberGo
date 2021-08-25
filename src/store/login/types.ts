import {Amministratore} from '../../models/models';

export interface AmministratoreLogin extends Partial<Amministratore> {
    token?: string,
    isLoading: boolean,
    isError: boolean
}