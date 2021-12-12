import {HotelDTO, Stelle} from '../../models/models';

export const getHotelStub = ():HotelDTO => ({
    id: 1,
    nome: 'Hotel carino',
    indirizzo: 'Via del carino 27',
    stelle: Stelle.UNO,
    descrizione: 'Hotel carino per persone gentili',
    telefono: '3823401362',
    codiceHotel: 'codiceprova',
    publicKey: '123'
})