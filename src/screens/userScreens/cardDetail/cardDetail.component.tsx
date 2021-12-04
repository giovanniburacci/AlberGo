import React, {useEffect, useState} from 'react';
import './cardDetail.scss'
import {useDispatch, useSelector} from 'react-redux';
import {loginSelector} from '../../../store/login/login.selector';
import CardActions from '../../../store/card/card.actions';
import cardSelector from '../../../store/card/card.selector';
import {Button, message, Skeleton, Spin} from 'antd';
import Cards from 'react-credit-cards';
import NewCard from './newCard/newCard.component';
import * as _ from 'lodash'
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'CardDetail';

export const CardDetail = () => {

    const dispatch = useDispatch();
    const user = useSelector(loginSelector.getUser)
    const isLoading = useSelector(cardSelector.getIsLoading)
    const isError = useSelector(cardSelector.getIsError)
    const cardData = useSelector(cardSelector.getCard)
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);

    const isLoadingCreate = useSelector(cardSelector.getIsLoadingCreate);
    const isErrorCreate = useSelector(cardSelector.getIsErrorCreate);

    useEffect(() => {
        console.log('clicked confirm', hasClickedOnConfirm);
        if(isLoadingCreate && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto aggiungendo la carta...'
            } as ArgsProps);
        }
        else if(isErrorCreate && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'aggiunta della carta!'
            } as ArgsProps);
        }
        else if(!isLoadingCreate && !isErrorCreate && hasClickedOnConfirm) {
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
        if(user?.id) {
            dispatch(CardActions.fetchCard(user.id))
        }
    }, [user])
    return (
        <div className={`${componentClassName}`}>
            {
                isLoading ? (
                    <Skeleton active />
                ) : isError ? (
                    'error'
                ) : !_.isEmpty(cardData) ? (
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
                                        dispatch(CardActions.removeCard(0)) // todo fix card id
                                    }}>
                                Elimina carta
                            </Button>
                        </div>
                    </>
                ) : (
                    <NewCard user={user} hasClickedOnConfirm={hasClickedOnConfirm} setHasClickedOnConfirm={(newValue:boolean) => setHasClickedOnConfirm(newValue)}/>
                )
            }
        </div>
    )
}

export default CardDetail;