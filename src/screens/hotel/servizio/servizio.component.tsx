import React, {useEffect, useState} from 'react';
import './servizio.scss'
import {Button, Input, InputNumber, message, Typography} from 'antd';
import {ServizioDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import serviziSelector from '../../../store/servizi/servizi.selector';
import {isEqual} from 'lodash';
import serviziActions from '../../../store/servizi/servizi.action';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'Servizio';

interface ServizioProps {
    servizio: ServizioDTO,
    closeDrawer: () => void
}

export const Servizio = (props:ServizioProps) => {
    const {Title} = Typography;

    const {servizio, closeDrawer} = props

    const dispatch = useDispatch();

    const [newServizio, setNewServizio] = useState<Partial<ServizioDTO>>(servizio);
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    const [hasClickedOnEdit, setHasClickedOnEdit] = useState<boolean>(false);
    const [hasClickedOnDelete, setHasClickedOnDelete] = useState<boolean>(false);

    const isLoadingEdit = useSelector(serviziSelector.getIsLoadingEdit);
    const isErrorEdit = useSelector(serviziSelector.getIsErrorEdit);
    const isLoadingDelete = useSelector(serviziSelector.getIsLoadingDelete);
    const isErrorDelete = useSelector(serviziSelector.getIsErrorDelete);

    useEffect(() => {
        if(isLoadingEdit && hasClickedOnEdit) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto modificando il servizio...'
            } as ArgsProps);
        }
        else if(isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella modifica del servizio!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingEdit && !isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Servizio modificato con successo!'
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
                content: 'Sto eliminando il servizio...'
            } as ArgsProps);
        }
        else if(isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'eliminazione del servizio!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingDelete && !isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Servizio eliminato con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoadingDelete, isErrorDelete])

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

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newServizio.nome) ? 'error-input' : ''}`}>
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
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newServizio.prezzo) ? 'error-input' : ''}`}>
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
                onClick={() => {
                    setHasClickedOnEdit(true);
                    if(newServizio?.nome && newServizio.prezzo) {
                        dispatch(serviziActions.editServizio({
                            ...servizio,
                            ...newServizio,
                        }))
                    }
                }}
            >Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={() => {
                    setHasClickedOnDelete(true)
                        dispatch(serviziActions.removeServizio(servizio));
                }}
            >Elimina</Button>
        </div>
    )
}

export default Servizio;