/*mport React, {useEffect, useState} from 'react';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Spin} from 'antd';
import {ClienteDTO} from '../../models/models';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedCliente, setSelectedCliente] = useState<ClienteDTO>();

    const selectPrenotazione = (record:ClienteDTO) => {
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
    useEffect(() => {
        if(isLoading) {
            console.log('cazzo loading')
        }
    }, [isLoading])
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

export default Prenotazioni;*/

export {}