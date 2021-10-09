import React, {useEffect, useState} from 'react';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import Prenotazione from './prenotazione/prenotazione.component';
import PrenotazioniBar from './prenotazioniBar/prenotazioniBar.component';
import NuovaPrenotazione from './nuovaPrenotazione/nuovaPrenotazione.component';
import {FatturaDTO} from '../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import prenotazioniActions from '../../store/prenotazioni/prenotazioni.action';
import {Spin} from 'antd';
import {prenotazioniSelector} from '../../store/prenotazioni/prenotazioni.selector';
import {FatturaMapped} from './types';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedPrenotazione, setSelectedPrenotazione] = useState<FatturaDTO>();
    const [isCreatingPrenotazione, setIsCreatingPrenotazione] = useState<boolean>(false);
    const listaPren = useSelector(prenotazioniSelector.getPrenotazioni)
    const isLoading = useSelector(prenotazioniSelector.getIsLoading);
    const isError = useSelector(prenotazioniSelector.getIsError);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(prenotazioniActions.fetchPrenotazioni(1))
    }, [])

    const selectPrenotazione = (record?:FatturaDTO) => {
        setSelectedPrenotazione(record);
        setIsDrawerVisible(true);
    }
    const columns:ColumnsType<FatturaMapped> = [{
        title: 'Stanza',
        dataIndex: 'numeroStanza',
        key: 'numeroStanza',
    },
        {
            title: 'Cognome',
            dataIndex: 'cognome',
            key: 'cliente.cognome'
        },
        {
            title: 'Check-in',
            dataIndex: 'dataInizio',
            key: 'prenotazione.dataInizio',
        },
        {
            title: 'Check-out',
            dataIndex: 'dataFine',
            key: 'prenotazione.dataFine'
        }];

    return (
        <>
            <div className={`${componentClassName}`}>
                {
                    isLoading ? (
                        <Spin size={'large'}/>
                    ) : isError ? (
                        <>boh</>
                    ) : ( listaPren &&
                        <>
                            <PrenotazioniBar setHasClickedNew={() => {
                                setIsDrawerVisible(true);
                                setIsCreatingPrenotazione(true);
                            }}/>
                            <Table
                                onRow={(record,index) => {
                                    return {
                                        onClick: () => {
                                            if(listaPren) {
                                                selectPrenotazione(listaPren.find(fattura => record.id === fattura.prenotazione.id))
                                            }}
                                    }
                                }}
                                columns={columns}
                                dataSource={listaPren.map((fattura) => ({
                                    id: fattura.prenotazione.id,
                                    numeroStanza: fattura.stanza.numeroStanza,
                                    cognome: fattura.cliente.cognome,
                                    dataInizio: fattura.prenotazione.dataInizio,
                                    dataFine: fattura.prenotazione.dataFine
                                }))}
                                pagination={false}
                                rowKey={(row) => row.id}
                            />
                        </>
                    )
                }
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
                    setIsCreatingPrenotazione(false);
                }}
                className={'ant-drawer-title-white'}
                title={ selectedPrenotazione ? (
                    <div style={{color: '#ffffff'}}>
                        Dettaglio prenotazione
                    </div>
                ) : isCreatingPrenotazione && (
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