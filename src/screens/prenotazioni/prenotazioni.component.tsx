import React, {useEffect} from 'react';
import {getPrenotazioniMapped} from '../../mocks/stubs/stubs';
import './prenotazioni.scss'
import {Button, Table, message} from 'antd';
import {PrenotazioneMapper, PrenotazioniColumns} from '../../models/table';
const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const prenotazioni = getPrenotazioniMapped();

    useEffect(() => {
        if(prenotazioni) {
            message.success('Hey fatto fatto')
        }
    },[prenotazioni])
    const columns:PrenotazioniColumns<PrenotazioneMapper>[] = [{
        title: 'Stanza',
        dataIndex: 'idStanza',
        sorter: {
            compare: (a,b) => Number(a.idStanza) - Number(b.idStanza),
            multiple: 1
        }
    },
        {
            title: 'Check-in',
            dataIndex: 'dataInizio',
            sorter: {
                compare: (a,b) => Number(a.dataInizio) - Number(b.dataInizio),
                multiple: 2
            }
        },
        {
            title: 'Check-out',
            dataIndex: 'dataFine',
            sorter: {
                compare: (a,b) => Number(a.dataFine) - Number(b.dataFine),
                multiple: 3
            }
        }];

    return (
        <div className={`${componentClassName}`}>
                <Table dataSource={prenotazioni} columns={columns} rowKey={(a) => ''+a.id}/>
        </div>
    )
}

export default Prenotazioni;