import {ClienteDTO} from '../../models/models';

export const getClienteStub = ():ClienteDTO => ({
    id: 1,
    nome: 'test',
    cognome: 'test',
    telefono: '3281940275',
    documento: 'ABCD123IT',
    username: 'test'
})
