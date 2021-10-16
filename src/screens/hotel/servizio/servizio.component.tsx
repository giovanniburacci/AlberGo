import React, {useEffect, useState} from 'react';
import './servizio.scss'
import {Button, Input, InputNumber, Typography} from 'antd';
import {ServizioDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import prenotazioniSelector from '../../../store/prenotazioni/prenotazioni.selector';
import {isEqual} from 'lodash';
const componentClassName = 'Servizio';

interface ServizioProps {
    servizio: ServizioDTO
}

export const Servizio = (props:ServizioProps) => {
    const {Title} = Typography;

    const {servizio} = props

    //todo add controlli date
    const dispatch = useDispatch();

    const [newServizio, setNewServizio] = useState<Partial<ServizioDTO>>();
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    useEffect(() => {
        setNewServizio(servizio);
    }, [servizio]);

    useEffect(() => {
        if(!isEqual(servizio, newServizio)) {
            setIsMakingChanges(true);
        } else {
            setIsMakingChanges(false);
        }
    }, [newServizio])

    const isLoadingEdit = useSelector(prenotazioniSelector.getIsLoadingEdit);
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newServizio && newServizio.nome}
                    onChange={(newNome) => {
                        if(newNome) {
                            setNewServizio((prevState => ({
                                    ...prevState,
                                    nome: newNome.target.value
                                }
                            )))
                        }
                    }}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input
                    placeholder="Descrizione"
                    value={newServizio && newServizio.nome}
                    onChange={(newDescrizione) => {
                        if(newDescrizione) {
                            setNewServizio((prevState => ({
                                    ...prevState,
                                    descrizione: newDescrizione.target.value
                                }
                            )))
                        }
                    }}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Prezzo
                </Title>
                <InputNumber
                    placeholder="Prezzo"
                    value={newServizio && newServizio.prezzo}
                    min={0}
                    onChange={(newPrezzo) => {
                        if(newPrezzo) {
                            setNewServizio((prevState => ({
                                    ...prevState,
                                    prezzo: newPrezzo
                                }
                            )))
                        }
                    }}
                />
            </div>
            <Button
                size={'large'}
                className={isMakingChanges ? 'button-edit' : ''}
                disabled={!isMakingChanges}
                onClick={/*() => {
                    if(newServizio) {
                        dispatch(prenotazioniActions.editPrenotazione({
                            ...prenotazione.prenotazione,
                            ...newPrenotazione,
                        }))
                    }
                }*/ () => -1}
            >Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={/*() => {
                    dispatch(prenotazioniActions.removePrenotazione(prenotazione.prenotazione));
                }*/ () => -1}
            >Elimina</Button>
        </div>
    )
}

export default Servizio;