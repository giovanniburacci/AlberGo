import {AmministratoreDTO} from '../../../models/models';

export interface AdminCreation extends AmministratoreDTO {
    password: string,
    publicKey: string
}