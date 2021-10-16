import React, {useEffect, useState} from 'react';
import './prenotazione.scss'
import {Button, DatePicker, Input, Select, Typography} from 'antd';
import {FatturaDTO, PrenotazioneDTO} from '../../../models/models';
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import clientiActions from '../../../store/clienti/clienti.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import moment from 'moment';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import prenotazioniSelector from '../../../store/prenotazioni/prenotazioni.selector';
import {isEqual} from 'lodash';
const componentClassName = 'Prenotazione';

interface PrenotazioneProps {
    prenotazione: FatturaDTO
}

export const Prenotazione = (props:PrenotazioneProps) => {
    const {Title} = Typography;

    const {prenotazione} = props

    //todo add controlli date
    const dispatch = useDispatch();

    const [newPrenotazione, setNewPrenotazione] = useState<Partial<PrenotazioneDTO>>();
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    useEffect(() => {
        setNewPrenotazione({
            id: prenotazione.prenotazione.id,
            dataInizio: prenotazione.prenotazione.dataInizio,
            dataFine: prenotazione.prenotazione.dataFine,
            idCliente: prenotazione.cliente.id,
            idStanza: prenotazione.stanza.id,
            idHotel: prenotazione.hotel.id
        });
        dispatch(clientiActions.fetchClienti(1)) // todo handle hotel id
        dispatch(stanzeActions.fetchStanze(1)) // todo handle hotel id
    }, [prenotazione]);

    useEffect(() => {
        if(!isEqual(prenotazione.prenotazione, newPrenotazione)) {
            setIsMakingChanges(true);
        } else {
            setIsMakingChanges(false);
        }
    }, [newPrenotazione])
    const isLoadingEdit = useSelector(prenotazioniSelector.getIsLoadingEdit);
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <div className={`${componentClassName}__inputgroup__name-labels`} >
                    <Title level={5}>
                        Nome
                    </Title>
                    <Title level={5}>
                        Cognome
                    </Title>
                </div>
                <Input.Group compact>
                    <Input
                        style={{ width: '50%' }}
                        placeholder={'Nome'}
                        disabled={true}
                        value={prenotazione.cliente.nome}/>
                    <Input
                        style={{ width: '50%' }}
                        placeholder={'Cognome'}
                        disabled={true}
                        value={prenotazione.cliente.cognome}/>
                </Input.Group>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Telefono
                </Title>
                <Input
                    placeholder="Telefono"
                    value={prenotazione.cliente.telefono}
                    disabled={true}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Documento
                </Title>
                <Input
                    placeholder="Documento"
                    value={prenotazione.cliente.documento}
                    disabled={true}
                    prefix={<UserOutlined />}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Data check-in</Title>
                <DatePicker
                    className={`${componentClassName}__inputgroup__datepicker`}
                    value={newPrenotazione && moment(newPrenotazione.dataInizio)}
                    onChange={(date) => {
                        if(date) {
                            setNewPrenotazione((prevState => ({
                                    ...prevState,
                                    dataInizio: date.toDate()
                                }
                            )))
                        }
                    }}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Data check-out</Title>
                <DatePicker
                    className={`${componentClassName}__inputgroup__datepicker`}
                    value={newPrenotazione && moment(newPrenotazione.dataFine)}
                    onChange={(date) => {
                        if(date) {
                            setNewPrenotazione((prevState => ({
                                    ...prevState,
                                    dataFine: date.toDate()
                                }
                            )))
                        }
                    }}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Stanza
                </Title>
                <Input
                    placeholder="Stanza"
                    value={'Stanza ' + prenotazione.stanza.numeroStanza}
                    disabled={true} />
            </div>
            <Button
                size={'large'}
                className={isMakingChanges ? 'button-edit' : ''}
                disabled={!isMakingChanges}
                onClick={() => {
                    if(newPrenotazione) {
                        dispatch(prenotazioniActions.editPrenotazione({
                            ...prenotazione.prenotazione,
                            ...newPrenotazione,
                        }))
                    }
                }}
                loading={isLoadingEdit}>Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={() => {
                   dispatch(prenotazioniActions.removePrenotazione(prenotazione.prenotazione));
                }}
                >Elimina</Button>
        </div>
    )
}

export default Prenotazione;