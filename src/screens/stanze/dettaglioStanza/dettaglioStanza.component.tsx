import React, {useEffect, useState} from 'react';
import './dettaglioStanza.scss'
import {Button, Checkbox, DatePicker, Input, InputNumber, Select, Typography} from 'antd';
import {StanzaDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import categorieActions from '../../../store/categorie/categorie.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import {isEqual} from 'lodash';
import stanzeSelector from '../../../store/stanze/stanze.selector';
import {StanzaWithStatus} from '../../../store/stanze/types';
import hotelSelector from '../../../store/hotel/hotel.selector';
const componentClassName = 'DettaglioStanza';
const {Title} = Typography;

interface PrenotazioneProps {
    stanza: StanzaWithStatus,
    resetFilters: () => void
}

export const DettaglioStanza = (props:PrenotazioneProps) => {

    const {stanza} = props

    //todo add controlli date
    const dispatch = useDispatch();

    const [newStanza, setNewStanza] = useState<StanzaDTO>(stanza);
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);

    const isLoadingEdit = useSelector(stanzeSelector.getIsLoadingEdit);
    const idHotel = useSelector(hotelSelector.getHotelId)
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
            <div className={`${componentClassName}__inputgroup`}>
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
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input placeholder="Descrizione" onChange={(val) => {setNewStanza(prevState => ({
                    ...prevState,
                    descrizione: val.target.value
                }))}} value={newStanza.descrizione}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
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
                    dispatch(stanzeActions.editStanza({
                        ...stanza,
                        ...newStanza,
                    }))
                }}
                loading={isLoadingEdit}>Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={() => {
                    props.resetFilters();
                    dispatch(stanzeActions.removeStanza(newStanza));
                }}
            >Elimina</Button>
        </div>
    )
}

export default DettaglioStanza;