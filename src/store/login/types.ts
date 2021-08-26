import {AmministratoreDTO} from '../../models/models';

export interface AmministratoreLogin extends Partial<AmministratoreDTO> {
    token?: string,
    isLoading: boolean,
    isError: boolean
}