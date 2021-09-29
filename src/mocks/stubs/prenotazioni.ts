import {PrenotazioneDTO, PrenotazioneIbridaDTO} from '../../models/models';
import {PrenotazioneIbridaMapper} from '../../models/table';

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
export const getPrenotazioniMapped = ():PrenotazioneIbridaMapper[] => {
    const prenotazioni: PrenotazioneIbridaDTO[] = getPrenotazioniIbride();
    return prenotazioni.map(
        prenotazione => ({
            ...prenotazione,
            dataInizio: prenotazione.dataInizio.getFullYear()+'-'+(prenotazione.dataInizio.getMonth()+1)+'-'+prenotazione.dataInizio.getDate(),
            dataFine: prenotazione.dataFine.getFullYear()+'-'+(prenotazione.dataFine.getMonth()+1)+'-'+prenotazione.dataFine.getDate()
        }));
}

export const getPrenotazioniIbride = () => {
    const prenotazioniIbrideStub: PrenotazioneIbridaDTO[] = [];

    for(let i = 0; i<10; i++) {
        prenotazioniIbrideStub.push({
            cognome: 'Buracci',
            dataFine: new Date('2021-07-28'),
            dataInizio: new Date('2021-07-25'),
            idPrenotazione: ''+i,
            nome: 'Giovanni',
            numeroStanza: i,
            telefono: '3925837092',
            nomeCategoria: 'acaso',
            documento: 'booooh'
        })
    }

    return prenotazioniIbrideStub;
}
