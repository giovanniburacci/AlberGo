import React, {useEffect, useState} from 'react';
import {DatePicker, Input, Typography, Select, Spin, Button, Tag, message} from 'antd';
import './nuovaPrenotazione.scss';
import { UserOutlined } from '@ant-design/icons';
import stanzeSelector from '../../../store/stanze/stanze.selector';
import clientiSelector from '../../../store/clienti/clienti.selector';
import {ClienteDTO, HotelDTO, PrenotazioneDTO, ServizioDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import clientiActions from '../../../store/clienti/clienti.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import serviziActions from '../../../store/servizi/servizi.action';
import serviziSelector from '../../../store/servizi/servizi.selector';
import {SelectValue} from 'antd/es/select';
import hotelSelector from '../../../store/hotel/hotel.selector';
import prenotazioniSelector from '../../../store/prenotazioni/prenotazioni.selector';
import {ArgsProps} from 'antd/es/message';

const componentClassName = 'NuovaPrenotazione';

interface NuovaPrenotazioneProps {
    hotel?: HotelDTO,
    cliente?: ClienteDTO,
    closeDrawer: () => void
}
const NuovaPrenotazione = (props: NuovaPrenotazioneProps) => {

    const {Title} = Typography;
    const {Option} = Select;
    const {hotel, cliente, closeDrawer} = props;

    const dispatch = useDispatch();

    const listaStanze = useSelector(stanzeSelector.getStanze);
    const listaUtenti = useSelector(clientiSelector.getClienti);
    const isLoadingStanze = useSelector(stanzeSelector.getIsLoading);
    const isLoadingUtenti = useSelector(clientiSelector.getIsLoading);
    const isErrorStanze = useSelector(stanzeSelector.getIsError);
    const isErrorUtenti = useSelector(clientiSelector.getIsError);
    const listaServizi = useSelector(serviziSelector.getServizi);
    const idHotel = useSelector(hotelSelector.getHotelId)

    const isLoading = useSelector(prenotazioniSelector.getIsLoadingCreate);
    const isError = useSelector(prenotazioniSelector.getIsErrorCreate);

    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);
    const [newPrenotazione, setNewPrenotazione] = useState<Partial<PrenotazioneDTO>>();
    const [newListaServizi, setNewListaServizi] = useState<ServizioDTO[]>([]);

    const getLocalNome = (): string => {
        if(!!cliente) {
            return cliente.nome;
        }
        if(listaUtenti && newPrenotazione && newPrenotazione.idCliente) {
            const cliente = listaUtenti.find(utente => utente.id === newPrenotazione.idCliente);
            if(cliente) {
                return cliente.nome;
            } else return '';
        } else return '';
    }

    const getLocalCognome = (): string => {
        if(!!cliente) {
            return cliente.cognome;
        }
        if(listaUtenti && newPrenotazione && newPrenotazione.idCliente) {
            const cliente = listaUtenti.find(utente => utente.id === newPrenotazione.idCliente);
            if(cliente) {
                return cliente.cognome;
            } else return '';
        } else return '';
    }

    const getLocalTelefono = (): string => {
        if(!!cliente) {
            return cliente.telefono;
        }
        if(listaUtenti && newPrenotazione && newPrenotazione.idCliente) {
            const cliente = listaUtenti.find(utente => utente.id === newPrenotazione.idCliente);
            if(cliente) {
                return cliente.telefono;
            } else return '';
        } else return '';
    }

    const getLocalDocumento = (): string => {
        if(!!cliente) {
            return cliente.documento;
        }
        if(listaUtenti && newPrenotazione && newPrenotazione.idCliente) {
            const cliente = listaUtenti.find(utente => utente.id === newPrenotazione.idCliente);
            if(cliente) {
                return cliente.documento;
            } else return '';
        } else return '';
    }

    const addServizio = (id: SelectValue) => {
        const newServizio = listaServizi?.find(s => s.id === id);
        if(newServizio) {
            setNewListaServizi(prev => [...prev, newServizio])
        }
    }

    const removeServizio = (id:number) => {
        const servizioIndex = newListaServizi.find(s => s.id === id)!.id;
        if(servizioIndex != -1) {
            setNewListaServizi((prev) => prev.filter(s => s.id !== servizioIndex))
        }
    }

    useEffect(() => {
        if(!!hotel) {
            dispatch(stanzeActions.fetchStanze(hotel.id))
            dispatch(serviziActions.fetchServizi(hotel.id));
        } else {
            dispatch(clientiActions.fetchClienti(idHotel))
            dispatch(stanzeActions.fetchStanze(idHotel))
            dispatch(serviziActions.fetchServizi(idHotel))
        }
    }, []);

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando la prenotazione...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione della prenotazione!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Prenotazione creata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoading, isError])

    return (
        <div className={`${componentClassName}`}>
            {
                (!(isLoadingStanze || (isLoadingUtenti && !cliente)) && !((isErrorUtenti && !cliente) || isErrorStanze)) ? (
                    <>
                        <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newPrenotazione?.idCliente && !cliente) ? 'error-input' : ''}`}>
                            <Title level={5}>Cliente</Title>
                            <Select
                                style={{width: '100%'}}
                                showSearch
                                placeholder="Cliente"
                                optionFilterProp="children"
                                value={cliente ? cliente.nome + ' ' + cliente.cognome : (newPrenotazione && newPrenotazione.idCliente) && newPrenotazione.idCliente}
                                onChange={(value) => {setNewPrenotazione((prevState => ({...prevState, idCliente: value as number})))}}
                                filterOption={(input, option) =>
                                    option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isErrorStanze || !!cliente}
                            >
                                {
                                    (listaUtenti && listaUtenti.length > 0) &&
                                    listaUtenti.map((utente) => (
                                        <Option key={utente.id} value={utente.id}>{utente.nome + ' ' + utente.cognome}</Option>
                                    ))
                                }
                            </Select>
                        </div>
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
                                    value={getLocalNome()}/>
                                <Input
                                    style={{ width: '50%' }}
                                    placeholder={'Cognome'}
                                    disabled={true}
                                    value={getLocalCognome()}/>
                            </Input.Group>
                        </div>
                        <div className={`${componentClassName}__inputgroup`}>
                            <Title level={5}>
                                Telefono
                            </Title>
                            <Input
                                placeholder="Telefono"
                                value={getLocalTelefono()}
                                disabled={true}/>
                        </div>
                        <div className={`${componentClassName}__inputgroup`}>
                            <Title level={5}>
                                Documento
                            </Title>
                            <Input
                                placeholder="Documento"
                                value={getLocalDocumento()}
                                disabled={true}
                                prefix={<UserOutlined />}/>
                        </div>

                        <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newPrenotazione?.dataInizio) ? 'error-input' : ''}`}>
                            <Title level={5}>Data check-in</Title>
                            <DatePicker
                                className={`${componentClassName}__inputgroup__datepicker`}
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
                        <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newPrenotazione?.dataFine) ? 'error-input' : ''}`}>
                            <Title level={5}>Data check-out</Title>
                            <DatePicker
                                className={`${componentClassName}__inputgroup__datepicker`}
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

                        <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newPrenotazione?.idStanza) ? 'error-input' : ''}`}>
                            <Title level={5}>
                                Stanza
                            </Title>
                            <Select
                                style={{width: '100%'}}
                                showSearch
                                placeholder="Stanza"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(value) => {setNewPrenotazione((prevState => ({...prevState, idStanza: Number(value)})))}}
                            >
                                {

                                    listaStanze && (listaStanze.length > 0) &&
                                    listaStanze.filter((stanza) => !stanza.fuoriServizio).map((stanza) => (
                                        <Option key={stanza.id} value={stanza.id}>{'Stanza ' + stanza.numeroStanza}</Option>
                                    ))
                                }
                            </Select>
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
                                onChange={addServizio}
                            >
                                {

                                    listaServizi && (listaServizi.length > 0) &&
                                    listaServizi.map((servizio) => (
                                        <Option key={servizio.id} value={servizio.id}>{servizio.nome + ', ' + servizio.prezzo}</Option>
                                    ))
                                }
                            </Select>
                        </div>

                        <div className={`${componentClassName}__taglist`}>
                            {newListaServizi?.map(s => (
                                <Tag
                                    key={s.id}
                                    onClose={() => removeServizio(s.id)}
                                    closable
                                >
                                    {s.nome + ', ' + s.prezzo}
                                </Tag>
                            ))}
                        </div>
                        <Button onClick={() => {
                            setHasClickedOnConfirm(true);
                            if( newPrenotazione && (newPrenotazione.idCliente || hotel && cliente) && newPrenotazione.idStanza && newPrenotazione.dataInizio && newPrenotazione.dataFine) {
                                dispatch(prenotazioniActions.addPrenotazione({
                                    prenotazione: {
                                        ...newPrenotazione,
                                        idHotel: !!hotel ? hotel.id : idHotel,
                                        idCliente: !!cliente ? cliente.id : newPrenotazione.idCliente
                                    },
                                    servizi: newListaServizi
                                }))
                            }
                        }}>Conferma</Button>
                    </>
                ) : (
                    <Spin size={'large'}/>
                )
            }


        </div>
    )
}

export default NuovaPrenotazione;