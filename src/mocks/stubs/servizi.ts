import {ServizioDTO} from '../../models/models';

export const getServiziStub = ():ServizioDTO[] => {
    let servizi = [];
    for(let i = 0; i < 10; i++) {
        servizi[i] = ({
            id: i,
            nome: 'Servizio a caso',
            prezzo: 30,
            idHotel: 1,
            idPrenotazione: i
        })
    }

    return servizi;
}