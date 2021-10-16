import {AmministratoreDTO} from '../../models/models';

export const getAmministratoreStub = ():AmministratoreDTO => ({
    id: 0,
    nome: 'Nome mockato',
    cognome: 'Cognome mockato',
    username: 'Username mockato',
    idHotel: 0
})