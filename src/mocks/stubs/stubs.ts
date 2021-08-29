import {PrenotazioneDTO} from '../../models/models';
import {PrenotazioneMapper} from '../../models/table';

export const getPrenotazioniStub = ():PrenotazioneDTO[] => {
    const prenotazioniStub:PrenotazioneDTO[] = [];
    for(let i=0;i<10;i++) {
        prenotazioniStub.push({
            id: ''+i,
            dataInizio: new Date('2020-7-18'),
            dataFine: new Date('2020-7-25'),
            idCliente: '0',
            idStanza: ''+i,
            idHotel: '1'
        })
    }
    return prenotazioniStub;
}
export const getPrenotazioniMapped = () => {
    const prenotazioni: PrenotazioneDTO[] = getPrenotazioniStub();
    const prenotazioniMapped: PrenotazioneMapper[] = prenotazioni.map(
        prenotazione => ({
            id: prenotazione.id.toString(),
            idStanza: prenotazione.idStanza.toString(),
            dataFine: prenotazione.dataFine.toString(),
            dataInizio: prenotazione.dataInizio.toString()
        }));

    return prenotazioniMapped;
}
