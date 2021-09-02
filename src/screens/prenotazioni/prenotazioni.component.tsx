import React, {useState} from 'react';
import {getPrenotazioniMapped} from '../../mocks/stubs/stubs';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {PrenotazioneMapper} from '../../models/table';
import {Drawer, Table} from 'antd';
import Prenotazione from './prenotazione/prenotazione.component';
import PrenotazioniBar from './prenotazioniBar/prenotazioniBar.component';
import NuovaPrenotazione from './nuovaPrenotazione/nuovaPrenotazione.component';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedPrenotazione, setSelectedPrenotazione] = useState<PrenotazioneMapper>();
    const prenotazioni = getPrenotazioniMapped();

    const selectPrenotazione = (record:PrenotazioneMapper) => {
        setSelectedPrenotazione(record);
        setIsDrawerVisible(true);
    }
    const columns:ColumnsType<PrenotazioneMapper> = [{
        title: 'Stanza',
        dataIndex: 'idStanza',
        key: 'idStanza',
    },
        {
            title: 'Check-in',
            dataIndex: 'dataInizio',
            key: 'dataInizio',
        },
        {
            title: 'Check-out',
            dataIndex: 'dataFine',
            key: 'dataFine'
        }];

    return (
        <>
            <div className={`${componentClassName}`}>
                <PrenotazioniBar setHasClickedNew={() => {setIsDrawerVisible(true)}}/>
                <Table
                    onRow={(record,index) => {
                        return {
                            onClick: () => {selectPrenotazione(record)}
                        }
                    }}
                    columns={columns}
                    dataSource={prenotazioni}
                    pagination={false}
                    rowKey={(row) => row.id}
                />
            </div>
            <Drawer
                visible={isDrawerVisible}
                onClose={() => {
                    setSelectedPrenotazione((prevState => {
                        if(prevState) {
                            return undefined;
                        }
                    }));
                    setIsDrawerVisible(false);
                }}
                title={ selectedPrenotazione ? (
                    'Dettaglio prenotazione'
                ) : (
                    'Nuova prenotazione'
                )}
                width={'348px'}>
                { selectedPrenotazione ? (
                    <Prenotazione
                        prenotazione={selectedPrenotazione}
                    />
                ) : (
                    <NuovaPrenotazione />
                )}
            </Drawer>
        </>
    )
}

export default Prenotazioni;