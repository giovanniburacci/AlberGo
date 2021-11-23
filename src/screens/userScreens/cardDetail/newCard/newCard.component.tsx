import React, {useState} from 'react';
import Title from 'antd/es/typography/Title';
import {Button, Input} from 'antd';
import {CardDataDTO} from '../../../../models/models';
import Cards from 'react-credit-cards';
import './newCard.scss'
import CardActions from '../../../../store/card/card.actions';
import {useDispatch} from 'react-redux';
const componentClassName = 'NewCard'
interface NewCardProps {
    nome?: string,
    cognome?: string
}
export const NewCard = (props: NewCardProps) => {

    const {nome,cognome} = props;
    const [newCard, setNewCard] = useState<Partial<CardDataDTO>>()
    const dispatch = useDispatch();
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Numero
                </Title>
                <Input
                    placeholder="Numero"
                    value={newCard?.number}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, number: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    CVC
                </Title>
                <Input
                    placeholder="CVC"
                    value={newCard?.cvc}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, cvc: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Mese scadenza
                </Title>
                <Input
                    placeholder="Mese scadenza"
                    value={newCard?.exp_month}
                    onChange={(value) => {setNewCard(prevState => ({...prevState, exp_month: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
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
                       name={nome && cognome ? nome + ' ' + cognome : ''}/>
            </div>
            <div className={`${componentClassName}__footer`}>
                <Button type={'primary'}
                        className={`${componentClassName}__footer__add-btn`}
                        onClick={() => {
                            dispatch(CardActions.addCard({})) // todo fix card partial
                        }}>
                    Salva carta
                </Button>
            </div>
        </div>
    )
}

export default NewCard;