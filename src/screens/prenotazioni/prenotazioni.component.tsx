import React, {useEffect, useState} from 'react';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import Prenotazione from './prenotazione/prenotazione.component';
import PrenotazioniBar from './prenotazioniBar/prenotazioniBar.component';
import NuovaPrenotazione from './nuovaPrenotazione/nuovaPrenotazione.component';
import {PrenotazioneIbridaDTO} from '../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import prenotazioniActions from '../../store/prenotazioni/prenotazioni.action';
import {Spin} from 'antd';
import {prenotazioniSelector} from '../../store/prenotazioni/prenotazioni.selector';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedPrenotazione, setSelectedPrenotazione] = useState<PrenotazioneIbridaDTO>();
    const [isCreatingPrenotazione, setIsCreatingPrenotazione] = useState<boolean>(false);
    const listaPren = useSelector(prenotazioniSelector.getPrenotazioni)
    const isLoading = useSelector(prenotazioniSelector.getIsLoading);
    const isError = useSelector(prenotazioniSelector.getIsError);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(prenotazioniActions.fetchPrenotazioni(1))
    }, [])

    const selectPrenotazione = (record:PrenotazioneIbridaDTO) => {
        setSelectedPrenotazione(record);
        setIsDrawerVisible(true);
    }
    const columns:ColumnsType<PrenotazioneIbridaDTO> = [{
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
                {
                    isLoading ? (
                        <Spin size={'large'}/>
                    ) : isError ? (
                        <>boh</>
                    ) : (
                        <>
                            <PrenotazioniBar setHasClickedNew={() => {
                                setIsDrawerVisible(true);
                                setIsCreatingPrenotazione(true);
                            }}/>
                            <Table
                                onRow={(record,index) => {
                                    return {
                                        onClick: () => {selectPrenotazione(record)}
                                    }
                                }}
                                columns={columns}
                                dataSource={listaPren}
                                pagination={false}
                                rowKey={(row) => row.idPrenotazione}
                            />
                        </>
                    )
                }
            </div>
            <Drawer
                headerStyle={{
                    background: '#eb2f96',
                    color: '#ffffff'
                }}
                bodyStyle={{background: '#f8f8ff'}}
                visible={isDrawerVisible}
                onClose={() => {
                    setSelectedPrenotazione((prevState => {
                        if(prevState) {
                            return undefined;
                        }
                    }));
                    setIsDrawerVisible(false);
                    setIsCreatingPrenotazione(false);
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
                ) :  isCreatingPrenotazione && (
                    <NuovaPrenotazione />
                )}
            </Drawer>
        </>
    )
}

export default Prenotazioni;