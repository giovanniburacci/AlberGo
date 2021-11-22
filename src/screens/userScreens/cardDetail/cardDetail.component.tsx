import React, {useEffect} from 'react';
import './cardDetail.scss'
import {useDispatch, useSelector} from 'react-redux';
import {loginSelector} from '../../../store/login/login.selector';
import CardActions from '../../../store/card/card.actions';
import cardSelector from '../../../store/card/card.selector';
import {Skeleton, Spin} from 'antd';
import Cards from 'react-credit-cards';
import NewCard from './newCard/newCard.component';
const componentClassName = 'CardDetail';

export const CardDetail = () => {

    const dispatch = useDispatch();
    const user = useSelector(loginSelector.getUser)
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
                ) : cardData ? (
                    <Cards cvc={cardData?.cvc || ''}
                           number={cardData?.number || ''}
                           expiry={cardData?.exp_month && cardData.exp_year ?
                               (cardData.exp_month + cardData.exp_year) : ''}
                           name={user?.nome && user?.cognome ? user.nome + ' ' + user.cognome : ''}/>
                ) : (
                    <NewCard nome={user?.nome} cognome={user?.cognome}/>
                )
            }
        </div>
    )
}

export default CardDetail;