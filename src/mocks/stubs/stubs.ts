import {PrenotazioneDTO} from '../../models/models';

export const getPrenotazioniStub = ():PrenotazioneDTO[] => {
    const prenotazioniStub:PrenotazioneDTO[] = [];
    for(let i=0;i<10;i++) {
        prenotazioniStub.push({
            idPrenotazione: '0',
            dataInizio: new Date('2020-7-18'),
            dataFine: new Date('2020-7-25'),
            idCliente: '0',
            idStanza: '0',
            idHotel: '1'
        })
    }
    return prenotazioniStub;
}