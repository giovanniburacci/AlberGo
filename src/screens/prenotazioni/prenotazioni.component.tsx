import React from 'react';
import {PrenotazioneDTO} from '../../models/models';
import {getPrenotazioniStub} from '../../mocks/stubs/stubs';
import './prenotazioni.scss'
import {Prenotazione} from './prenotazione/prenotazione.component';
const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const prenotazioni:PrenotazioneDTO[] = getPrenotazioniStub();
    return (
        <div className={`${componentClassName}`}>
            {
                prenotazioni.map(prenotazione => {
                    return (
                        <Prenotazione />
                    )
                })
            }
        </div>
    )
}

export default Prenotazioni;