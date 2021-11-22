import React, {useState} from 'react';
import Title from 'antd/es/typography/Title';
import {Button, Input} from 'antd';
import {CardDataDTO, ClienteDTO} from '../../../../models/models';
import Cards from 'react-credit-cards'
import './userSignUp.scss'

const componentClassName = 'UserSignUp'

export const UserSignUp = () => {
    const [newUser, setNewUser] = useState<Partial<ClienteDTO>>()
    const [cardData, setCardData] = useState<Partial<CardDataDTO>>()
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newUser?.nome}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, nome: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newUser?.cognome}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, cognome: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Telefono
                </Title>
                <Input
                    placeholder="Telefono"
                    value={newUser?.telefono}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, telefono: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Documento
                </Title>
                <Input
                    placeholder="Documento"
                    value={newUser?.documento}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, documento: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Username
                </Title>
                <Input
                    placeholder="Username"
                    value={newUser?.username}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, username: value.target.value}))}}/>
            </div>

            <hr/>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Numero carta
                </Title>
                <Input
                    placeholder="Username"
                    value={cardData?.number}
                    onChange={(value) => {setCardData(prevState => ({...prevState, number: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    CVC
                </Title>
                <Input
                    type={'number'}
                    minLength={3}
                    maxLength={3}
                    min={0}
                    max={999}
                    placeholder="cvc"
                    value={cardData?.cvc}
                    onChange={(value) => {setCardData(prevState => ({...prevState, cvc: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Mese scadenza
                </Title>
                <Input
                    placeholder="Mese scadenza"
                    type={'number'}
                    min={1}
                    max={12}
                    value={cardData?.exp_month}
                    onChange={(value) => {setCardData(prevState => ({...prevState, exp_month: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Anno scadenza
                </Title>
                <Input
                    type={'number'}
                    min={1900}
                    placeholder="Anno scadenza"
                    value={cardData?.exp_year}
                    onChange={(value) => {setCardData(prevState => ({...prevState, exp_year: value.target.value}))}}/>
            </div>

            <Cards cvc={cardData?.cvc || ''}
                   number={cardData?.number || ''}
                   expiry={cardData?.exp_month && cardData.exp_year ?
                       (cardData.exp_month + cardData.exp_year) : ''}
                   name={newUser?.nome && newUser.cognome ? newUser.nome + ' ' + newUser.cognome : ''}
            />

            <Button
                className={`${componentClassName}__btn`}
                type={'primary'}
                onClick={() => null}>
                Registrati
            </Button>
        </div>

    )
}

export default UserSignUp;