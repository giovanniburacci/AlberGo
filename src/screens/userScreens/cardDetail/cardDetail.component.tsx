import React, {useEffect, useState} from 'react';
import './cardDetail.scss'
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../../store/auth/auth.selector';
import CardActions from '../../../store/card/card.actions';
import cardSelector from '../../../store/card/card.selector';
import {Button, Empty, message, Skeleton, Spin} from 'antd';
import Cards from 'react-credit-cards';
import NewCard from './newCard/newCard.component';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'CardDetail';

export const CardDetail = () => {

    const dispatch = useDispatch();
    const user = useSelector(authSelector.getUser)
    const isLoading = useSelector(cardSelector.getIsLoading)
    const isError = useSelector(cardSelector.getIsError)
    const cardData = useSelector(cardSelector.getCard)
    const [hasClickedOnSave, setHasClickedOnSave] = useState<boolean>(false);
    const [hasClickedOnDelete, setHasClickedOnDelete] = useState<boolean>(false);

    const isLoadingCreate = useSelector(cardSelector.getIsLoadingCreate);
    const isErrorCreate = useSelector(cardSelector.getIsErrorCreate);

    const isLoadingDelete = useSelector(cardSelector.getIsLoadingDelete)
    const isErrorDelete = useSelector(cardSelector.getIsErrorDelete)

    useEffect(() => {
        if(user?.id) {
            dispatch(CardActions.fetchCard(user.id))
        }
    }, [user])

    useEffect(() => {
        if(isLoadingCreate && hasClickedOnSave) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto aggiungendo la carta...'
            } as ArgsProps);
        }
        else if(isErrorCreate && hasClickedOnSave) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'aggiunta della carta!'
            } as ArgsProps);
        }
        else if(!isLoadingCreate && !isErrorCreate && hasClickedOnSave) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Carta creata con successo!'
            } as ArgsProps);
        }
    }, [isLoadingCreate, isErrorCreate])

    useEffect(() => {
        if(isLoadingDelete && hasClickedOnDelete) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto eliminando la carta...'
            } as ArgsProps);
        }
        else if(isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'eliminazione della carta!'
            } as ArgsProps);
        }
        else if(!isLoadingDelete && !isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Carta eliminata con successo!'
            } as ArgsProps);
        }
    }, [isLoadingDelete, isErrorDelete])

    return (
        <div className={`${componentClassName}`}>
            {
                isLoading ? (
                    <Skeleton active />
                ) : isError ? (
                    <Empty />
                ) : (cardData && cardData.number !== null) ? (
                    <>
                        <Cards cvc={cardData?.cvc || ''}
                               number={cardData?.number || ''}
                               locale={{valid: 'VALIDA FINO AL'}}
                               expiry={cardData?.exp_month && cardData.exp_year ?
                                   (cardData.exp_month + cardData.exp_year) : ''}
                               name={user?.nome && user?.cognome ? user.nome + ' ' + user.cognome : ''}
                                />
                        <div className={`${componentClassName}__footer`}>
                            <Button type={'primary'}
                                    danger
                                    className={`${componentClassName}__footer__delete-btn`}
                                    onClick={() => {
                                        setHasClickedOnDelete(true);
                                        if(user) {
                                            dispatch(CardActions.removeCard(user.id))
                                        }
                                    }}>
                                Elimina carta
                            </Button>
                        </div>
                    </>
                ) : (
                    <NewCard hasClickedOnConfirm={hasClickedOnSave} resetHasClickedOnDelete={() => setHasClickedOnDelete(true)} setHasClickedOnConfirm={(value) => setHasClickedOnSave(value)} user={user} />
                )
            }
        </div>
    )
}

export default CardDetail;