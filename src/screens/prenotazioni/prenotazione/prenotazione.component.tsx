import React from 'react';
import './prenotazione.scss'
import {DatePicker, Typography} from 'antd';
import moment from 'moment';
import {FatturaDTO} from '../../../models/models';
const componentClassName = 'Prenotazione';

interface PrenotazioneProps {
    prenotazione: FatturaDTO
}
export const Prenotazione = (props:PrenotazioneProps) => {
    const {Title,Text} = Typography;
    const {prenotazione} = props

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Check-in</Title>
                <DatePicker
                    value={moment(prenotazione.prenotazione.dataInizio)}
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Check-out</Title>
                <DatePicker
                    value={moment(prenotazione.prenotazione.dataFine)}
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>
        </div>
    )
}

export default Prenotazione;