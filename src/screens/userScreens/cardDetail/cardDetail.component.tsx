import React, {useEffect, useState} from 'react';
import './cardDetail.scss'
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../../store/auth/auth.selector';
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
    const user = useSelector(authSelector.getUser)
    const isLoading = useSelector(cardSelector.getIsLoading)
    const isError = useSelector(cardSelector.getIsError)
    const cardData = useSelector(cardSelector.getCard)

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
                ) : (cardData && cardData.cardId !== null) ? (
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
                                        if(user) {
                                            dispatch(CardActions.removeCard(user.id))
                                        }
                                    }}>
                                Elimina carta
                            </Button>
                        </div>
                    </>
                ) : (
                    <NewCard user={user} />
                )
            }
        </div>
    )
}

export default CardDetail;