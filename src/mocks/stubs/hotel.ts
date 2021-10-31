import {HotelDTO, Stelle} from '../../models/models';

export const getHotelStub = ():HotelDTO => ({
    id: 0,
    nome: 'Hotel balordo',
    indirizzo: 'Via del degrado 27',
    stelle: Stelle.UNO,
    descrizione: 'Hotel trasandato per persone disperate',
    telefono: '3823401362'
})