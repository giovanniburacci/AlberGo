import React, {useState} from 'react';
import {getPrenotazioniMapped} from '../../mocks/stubs/stubs';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import Prenotazione from './prenotazione/prenotazione.component';
import PrenotazioniBar from './prenotazioniBar/prenotazioniBar.component';
import NuovaPrenotazione from './nuovaPrenotazione/nuovaPrenotazione.component';
import {PrenotazioneIbridaMapper} from '../../models/table';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedPrenotazione, setSelectedPrenotazione] = useState<PrenotazioneIbridaMapper>();
    const prenotazioni = getPrenotazioniMapped();

    const selectPrenotazione = (record:PrenotazioneIbridaMapper) => {
        setSelectedPrenotazione(record);
        setIsDrawerVisible(true);
    }
    const columns:ColumnsType<PrenotazioneIbridaMapper> = [{
        title: 'Stanza',
        dataIndex: 'numeroStanza',
        key: 'numeroStanza',
    },
        {
            title: 'Cognome',
            dataIndex: 'cognome',
            key: 'cognome'
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
                    rowKey={(row) => row.idPrenotazione}
                />
            </div>
            <Drawer
                headerStyle={{
                    background: '#eb2f96',
                    color: '#ffffff'
                }}
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
                    <div style={{color: '#ffffff'}}>
                        Dettaglio prenotazione
                    </div>
                ) : (
                    <div style={{color: '#ffffff'}}>
                        Nuova prenotazione
                    </div>
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