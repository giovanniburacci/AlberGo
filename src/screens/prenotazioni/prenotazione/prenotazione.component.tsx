import React from 'react';
import {PrenotazioneMapper} from '../../../models/table';
import './prenotazione.scss'
import {DatePicker, Typography} from 'antd';
import moment from 'moment';
const componentClassName = 'Prenotazione';

interface PrenotazioneProps {
    prenotazione: PrenotazioneMapper
}
export const Prenotazione = (props:PrenotazioneProps) => {
    const {Title,Text} = Typography;
    const {prenotazione} = props

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Check-in</Title>
                <DatePicker
                    value={moment(prenotazione.dataInizio)}
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Check-out</Title>
                <DatePicker
                    value={moment(prenotazione.dataFine)}
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>
        </div>
    )
}

export default Prenotazione;