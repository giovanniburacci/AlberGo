import React, {useEffect, useState} from 'react';
import './prenotazione.scss'
import {Button, DatePicker, Input, message, Select, Tag, Typography} from 'antd';
import {FatturaDTO, PrenotazioneDTO} from '../../../models/models';
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import clientiActions from '../../../store/clienti/clienti.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import moment from 'moment';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import serviziActions from '../../../store/servizi/servizi.action';
import prenotazioniSelector from '../../../store/prenotazioni/prenotazioni.selector';
import {isEqual} from 'lodash';
import serviziSelector from '../../../store/servizi/servizi.selector';
import hotelSelector from '../../../store/hotel/hotel.selector';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'Prenotazione';

interface PrenotazioneProps {
    prenotazione: FatturaDTO,
    closeDrawer: () => void
}
const {Title} = Typography;
const {Option} = Select;
export const Prenotazione = (props:PrenotazioneProps) => {

    const {prenotazione, closeDrawer} = props

    //todo add controlli date
    const dispatch = useDispatch();

    const [newPrenotazione, setNewPrenotazione] = useState<Partial<PrenotazioneDTO>>();
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    const [hasClickedOnEdit, setHasClickedOnEdit] = useState<boolean>(false);
    const [hasClickedOnDelete, setHasClickedOnDelete] = useState<boolean>(false);

    const isLoadingEdit = useSelector(prenotazioniSelector.getIsLoadingEdit);
    const isErrorEdit = useSelector(prenotazioniSelector.getIsErrorEdit);
    const isLoadingDelete = useSelector(prenotazioniSelector.getIsLoadingDelete);
    const isErrorDelete = useSelector(prenotazioniSelector.getIsErrorDelete);
    const serviziDisponibili = useSelector(serviziSelector.getServiziDisponibili);
    const serviziScelti = useSelector(serviziSelector.getServiziScelti);
    const idHotel = useSelector(hotelSelector.getHotelId)


    useEffect(() => {
        if(isLoadingEdit && hasClickedOnEdit) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto modificando la prenotazione...'
            } as ArgsProps);
        }
        else if(isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella modifica della prenotazione!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingEdit && !isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Prenotazione modificata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoadingEdit, isErrorEdit])

    useEffect(() => {
        if(isLoadingDelete && hasClickedOnDelete) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto eliminando la prenotazione...'
            } as ArgsProps);
        }
        else if(isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'eliminazione della prenotazione!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingDelete && !isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Prenotazione eliminata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoadingDelete, isErrorDelete])

    useEffect(() => {
        setNewPrenotazione({
            id: prenotazione.prenotazione.id,
            dataInizio: prenotazione.prenotazione.dataInizio,
            dataFine: prenotazione.prenotazione.dataFine,
            idCliente: prenotazione.cliente.id,
            idStanza: prenotazione.stanza.id,
            idHotel: prenotazione.hotel.id
        });
        dispatch(clientiActions.fetchClienti(idHotel))
        dispatch(stanzeActions.fetchStanze(idHotel))
        dispatch(serviziActions.fetchServiziDisponibiliByPrenotazione(prenotazione.prenotazione.id))
        dispatch(serviziActions.fetchServiziSceltiByPrenotazione(prenotazione.prenotazione.id))
    }, [prenotazione]);


    useEffect(() => {
        if(!isEqual(prenotazione.prenotazione, newPrenotazione)) {
            setIsMakingChanges(true);
        } else {
            setIsMakingChanges(false);
        }
    }, [newPrenotazione])
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

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Servizi
                </Title>
                <Select
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Servizi"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value) => {
                        if(value) {
                            dispatch(serviziActions.addServizioToPrenotazione({
                                prenotazioneId: (newPrenotazione && newPrenotazione.id) || prenotazione.prenotazione.id,
                                servizioId: value as number
                            }))
                        }}}
                >
                    {

                        serviziDisponibili && (serviziDisponibili.length > 0) &&
                        serviziDisponibili.map((servizio) => (
                            <Option key={servizio.id} value={servizio.id}>{servizio.nome + ', ' + servizio.prezzo}</Option>
                        ))
                    }
                </Select>
            </div>

            <div className={`${componentClassName}__taglist`}>
                {serviziScelti && serviziScelti.map(s => (
                    <Tag
                        key={s.id}
                        onClose={() => {dispatch(serviziActions.removeServizioFromPrenotazione({
                            prenotazioneId: (newPrenotazione && newPrenotazione.id) || prenotazione.prenotazione.id,
                            servizioId: s.id
                        }))}}
                        closable
                    >
                        {s.nome + ', ' + s.prezzo}
                    </Tag>
                ))}
            </div>

            <Button
                size={'large'}
                className={isMakingChanges ? 'button-edit' : ''}
                disabled={!isMakingChanges}
                onClick={() => {
                    setHasClickedOnEdit(true);
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
                    setHasClickedOnDelete(true);
                    dispatch(prenotazioniActions.removePrenotazione(prenotazione.prenotazione));
                }}
            >Elimina</Button>
        </div>
    )
}

export default Prenotazione;