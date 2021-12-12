import React, {useEffect} from 'react';
import {Empty, Spin, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {FatturaMapped} from '../types';
import {FatturaDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import {prenotazioniSelector} from '../../../store/prenotazioni/prenotazioni.selector';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import hotelSelector from '../../../store/hotel/hotel.selector';
import {authSelector} from '../../../store/auth/auth.selector';

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

interface PrenotazioniListProps {
    setIsDrawerVisible: () => void,
    setSelectedPrenotazione: (record?: FatturaDTO) => void
}
export const PrenotazioniList = (props:PrenotazioniListProps) => {

    const {setIsDrawerVisible, setSelectedPrenotazione} = props;
    const listaPren: FatturaDTO[] | undefined = useSelector(prenotazioniSelector.getPrenotazioni)
    const isLoading = useSelector(prenotazioniSelector.getIsLoading);
    const isError = useSelector(prenotazioniSelector.getIsError);
    const idHotel = useSelector(hotelSelector.getHotelId)
    const isAdmin = !!useSelector(authSelector.getAmministratore);
    const idUser = useSelector(authSelector.getIdUser)
    const selectPrenotazione = (record?:FatturaDTO) => {
        setSelectedPrenotazione(record);
        setIsDrawerVisible();
    }

    const dispatch = useDispatch();
    useEffect( () => {
        if(isAdmin) {
            dispatch(prenotazioniActions.fetchPrenotazioni(idHotel));
        } else {
            console.log(idUser);
            dispatch(prenotazioniActions.fetchPrenotazioniByCliente(idUser!))
        }
    }, [isAdmin])

    // @ts-ignore
    return (
            isLoading ? (
                    <Spin />
                ) : isError ? (
                    <Empty />
                ) : (
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
                    dataSource={listaPren && listaPren.map((fattura) => ({
                        id: fattura.prenotazione.id,
                        numeroStanza: fattura.stanza.numeroStanza,
                        cognome: fattura.cliente.cognome,
                        dataInizio: fattura.prenotazione.dataInizio,
                        dataFine: fattura.prenotazione.dataFine
                    }))}
                    pagination={false}
                    rowKey={(row) => row.id}
                />
            )
    )
}

export default PrenotazioniList;