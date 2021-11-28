import {FatturaDTO, PrenotazioneDTO} from '../../models/models';
import {getClienteStub} from '../../mocks/stubs/cliente';
import {getCategorieStub} from '../../mocks/stubs/categorie';
import {getStanzeStub} from '../../mocks/stubs/stanze';
import {getHotelStub} from '../../mocks/stubs/hotel';

export const getPrenotazioniStub = ():PrenotazioneDTO[] => {
    const prenotazioniStub:PrenotazioneDTO[] = [];
    for(let i=0;i<10;i++) {
        prenotazioniStub.push({
            id: i,
            dataInizio: new Date('2020-7-18'),
            dataFine: new Date('2020-7-25'),
            idCliente: i,
            idStanza: i,
            idHotel: i
        })
    }
    return prenotazioniStub;
}

export const getFatturaStub = ():FatturaDTO => ({
    prenotazione: {
        id: 1,
        dataInizio: new Date('2020-7-18'),
        dataFine: new Date('2020-7-25'),
        idCliente: 1,
        idStanza: 1,
        idHotel: 1
    },
    cliente: {
        ...getClienteStub()
    },
    categoria: {
        ...getCategorieStub()[0]
    },
    stanza: {
        ...getStanzeStub()[0]
    },
    hotel: {
        ...getHotelStub()
    }})

