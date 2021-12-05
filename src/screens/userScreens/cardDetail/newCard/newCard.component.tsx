import React, {useEffect, useState} from 'react';
import Title from 'antd/es/typography/Title';
import {Button, Input, message} from 'antd';
import {CardDataDTO, ClienteDTO} from '../../../../models/models';
import Cards from 'react-credit-cards';
import './newCard.scss'
import CardActions from '../../../../store/card/card.actions';
import {useDispatch, useSelector} from 'react-redux';
import cardSelector from '../../../../store/card/card.selector';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'NewCard'
interface NewCardProps {
    user?: ClienteDTO
}
export const NewCard = (props: NewCardProps) => {

    const {user} = props;
    const [newCard, setNewCard] = useState<Partial<CardDataDTO>>()
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);

    const isLoading = useSelector(cardSelector.getIsLoadingCreate);
    const isError = useSelector(cardSelector.getIsErrorCreate);

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto aggiungendo la carta...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'aggiunta della carta!'
            } as ArgsProps);
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Carta creata con successo!'
            } as ArgsProps);
        }
    }, [isLoading, isError])

    const dispatch = useDispatch();
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCard?.number) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Numero
                </Title>
                <Input
                    placeholder="Numero"
                    value={newCard?.number}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, number: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCard?.cvc) ? 'error-input' : ''}`}>
                <Title level={5}>
                    CVC
                </Title>
                <Input
                    placeholder="CVC"
                    value={newCard?.cvc}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, cvc: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCard?.exp_month) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Mese scadenza
                </Title>
                <Input
                    placeholder="Mese scadenza"
                    value={newCard?.exp_month}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, exp_month: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCard?.exp_year) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Anno scadenza
                </Title>
                <Input
                    placeholder="Anno scadenza"
                    value={newCard?.exp_year}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, exp_year: value.target.value}))}}/>
            </div>
            <div className={`${componentClassName}__card-wrapper`}>
                <Cards cvc={newCard?.cvc || ''}
                       number={newCard?.number || ''}
                       expiry={newCard?.exp_month && newCard.exp_year ?
                           (newCard.exp_month + newCard.exp_year) : ''}
                       name={user && user.nome && user.cognome ? user.nome + ' ' + user.cognome : ''}/>
            </div>
            <div className={`${componentClassName}__footer`}>
                <Button type={'primary'}
                        className={`${componentClassName}__footer__add-btn`}
                        onClick={() => {
                            setHasClickedOnConfirm(true);
                            if(newCard && user) {
                                dispatch(CardActions.addCard(
                                    {
                                        ...newCard,
                                        idCliente: user.id
                                    }))
                            }
                        }}>
                    Salva carta
                </Button>
            </div>
        </div>
    )
}

export default NewCard;