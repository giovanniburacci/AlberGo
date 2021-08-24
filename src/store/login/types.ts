import {Amministratore} from '../../models/models';

export interface AmministratoreLogin extends Partial<Amministratore> {
    token?: string
}