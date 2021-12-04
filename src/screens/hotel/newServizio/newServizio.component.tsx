import React, {useEffect, useState} from 'react';
import {Input, Typography, Button, InputNumber, message} from 'antd';
import './newServizio.scss';
import {ServizioDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import serviziActions from '../../../store/servizi/servizi.action';
import hotelSelector from '../../../store/hotel/hotel.selector';
import serviziSelector from '../../../store/servizi/servizi.selector';
import {ArgsProps} from 'antd/es/message';

interface NewServizioProps {
    closeDrawer: () => void
}
const componentClassName = 'NewServizio';
const NewServizio = (props: NewServizioProps) => {

    const {Title} = Typography;
    const {closeDrawer} = props;
    const dispatch = useDispatch();
    const [newServizio, setNewServizio] = useState<Partial<ServizioDTO>>();
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);;
    const idHotel = useSelector(hotelSelector.getHotelId)
    const isLoading = useSelector(serviziSelector.getIsLoadingCreate);
    const isError = useSelector(serviziSelector.getIsErrorCreate);

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando il servizio...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione del servizio!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Servizio creato con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoading, isError])
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newServizio?.nome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Nome del servizio
                </Title>
                <Input placeholder="Nome" onChange={(event) => {
                    setNewServizio((prevState => {
                        return {
                            ...prevState,
                            nome: event.target.value
                        }
                    }))
                }} value={newServizio?.nome}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newServizio?.prezzo) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Prezzo
                </Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'€'}
                    placeholder={'Prezzo'}
                    value={newServizio?.prezzo}
                    onChange={(value) => {
                        setNewServizio(prevState => {
                            return {
                                ...prevState,
                                prezzo: value
                            }
                        })
                    }}/>
            </div>
            <Button onClick={() => {
                setHasClickedOnConfirm(true);
                if(newServizio && newServizio.prezzo && newServizio.nome) {
                    dispatch(serviziActions.addServizio({
                        ...newServizio,
                        idHotel
                    }));
                }
            }}>Conferma</Button>
        </div>
    )
}

export default NewServizio;