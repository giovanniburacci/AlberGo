import React, {useEffect, useState} from 'react';
import './dettaglioStanza.scss'
import {Button, Checkbox, DatePicker, Input, InputNumber, message, Select, Typography} from 'antd';
import {StanzaDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import categorieActions from '../../../store/categorie/categorie.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import {isEqual} from 'lodash';
import stanzeSelector from '../../../store/stanze/stanze.selector';
import {StanzaWithStatus} from '../../../store/stanze/types';
import hotelSelector from '../../../store/hotel/hotel.selector';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'DettaglioStanza';
const {Title} = Typography;

interface PrenotazioneProps {
    stanza: StanzaWithStatus,
    resetFilters: () => void,
    closeDrawer: () => void
}

const DettaglioStanza = (props:PrenotazioneProps) => {

    const {stanza, closeDrawer} = props

    const dispatch = useDispatch();

    const [newStanza, setNewStanza] = useState<StanzaDTO>(stanza);
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    const [hasClickedOnEdit, setHasClickedOnEdit] = useState<boolean>(false);
    const [hasClickedOnDelete, setHasClickedOnDelete] = useState<boolean>(false);

    const isLoadingEdit = useSelector(stanzeSelector.getIsLoadingEdit);
    const isErrorEdit = useSelector(stanzeSelector.getIsErrorEdit);
    const isLoadingDelete = useSelector(stanzeSelector.getIsLoadingDelete);
    const isErrorDelete = useSelector(stanzeSelector.getIsErrorDelete);

    const idHotel = useSelector(hotelSelector.getHotelId)
    useEffect(() => {
        if(isLoadingEdit && hasClickedOnEdit) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto modificando la stanza...'
            } as ArgsProps);
        }
        else if(isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella modifica della stanza!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingEdit && !isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Stanza modificata con successo!'
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
                content: 'Sto eliminata la stanza...'
            } as ArgsProps);
        }
        else if(isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'eliminazione della stanza!'
            } as ArgsProps);
        }
        else if(!isLoadingDelete && !isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Stanza eliminata con successo!'
            } as ArgsProps);
        }
    }, [isLoadingDelete, isErrorDelete])

    useEffect(() => {
        dispatch(categorieActions.fetchCategorie(idHotel))
    }, [stanza]);

    useEffect(() => {
        if(!isEqual(stanza, newStanza)) {
            setIsMakingChanges(true);
        } else {
            setIsMakingChanges(false);
        }
    }, [newStanza])

    if(!newStanza) {
        return null;
    }

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newStanza.numeroStanza) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Numero stanza
                </Title>
                <InputNumber
                    placeholder="Numero stanza"
                    value={newStanza.numeroStanza}
                    disabled={true}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Fuori servizio</Title>
                <Checkbox
                    onChange={(val) => {setNewStanza((prevState => ({
                        ...prevState,
                        fuoriServizio: val.target.checked
                    })))}}
                    checked={newStanza.fuoriServizio}>La stanza è attualmente fuori servizio</Checkbox>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newStanza.descrizione) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input placeholder="Descrizione" onChange={(val) => {setNewStanza(prevState => ({
                    ...prevState,
                    descrizione: val.target.value
                }))}} value={newStanza.descrizione}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newStanza.metriQuadri) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Metri quadri
                </Title>
                <InputNumber
                    placeholder="Metri quadri"
                    disabled={true}
                    value={newStanza.metriQuadri}
                />
            </div>
            <Button
                size={'large'}
                className={isMakingChanges ? 'button-edit' : ''}
                disabled={!isMakingChanges}
                onClick={() => {
                    props.resetFilters();
                    setHasClickedOnEdit(true);
                    if(newStanza && newStanza.numeroStanza && newStanza.descrizione && newStanza.idCategoria && newStanza.metriQuadri) {
                        dispatch(stanzeActions.editStanza({
                            ...stanza,
                            ...newStanza,
                        }))
                    }
                }}
                loading={isLoadingEdit}>Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={() => {
                    props.resetFilters();
                    setHasClickedOnDelete(true);
                    dispatch(stanzeActions.removeStanza(newStanza));
                }}
            >Elimina</Button>
        </div>
    )
}

export default DettaglioStanza;