import {StanzaDTO} from '../../models/models';

export const getStanzeStub = ():StanzaDTO[] => {

    const stanzeStub:StanzaDTO[] = [];
    for(let i = 0; i < 10; i++) {
        const randStato = Math.random()*10;
        stanzeStub.push({
            descrizione: 'Descrizione casuale',
            fuoriServizio: randStato < 3,
            id: i,
            idCategoria: 1,
            idHotel: i,
            metriQuadri: 20,
            numeroStanza: i
        });
    }

    return stanzeStub;
}