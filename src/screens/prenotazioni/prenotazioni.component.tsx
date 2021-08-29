import React, {useEffect} from 'react';
import {getPrenotazioniMapped} from '../../mocks/stubs/stubs';
import './prenotazioni.scss'
import VirtualTable from '../../components/virtualTable/virtualTable.component';
const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const prenotazioni = getPrenotazioniMapped();

    const columns:any[] = [{
        title: 'Stanza',
        dataIndex: 'idStanza',
        sorter: (a: { idStanza: string; }, b: { idStanza: string; }) => Number(a.idStanza)-Number(b.idStanza)
    },
        {
            title: 'Check-in',
            dataIndex: 'dataInizio',
        },
        {
            title: 'Check-out',
            dataIndex: 'dataFine',
        }];

    return (
        <div className={`${componentClassName}`}>
            { /* <Table dataSource={prenotazioni} columns={columns} rowKey={(a) => ''+a.id}/> */}
            <VirtualTable
                columns={columns}
                dataSource={prenotazioni}
                scroll={{ x:'100vw', y: 450}}/>
        </div>
    )
}

export default Prenotazioni;