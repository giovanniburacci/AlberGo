import React, {useEffect, useState} from 'react';
import Title from 'antd/es/typography/Title';
import {Button, Input, message} from 'antd';
import {CardDataDTO, ClienteDTO} from '../../../../models/models';
import Cards from 'react-credit-cards'
import './userSignUp.scss'
import {useDispatch, useSelector} from 'react-redux';
import loginActions from '../../../../store/auth/auth.action';
import {ArgsProps} from 'antd/es/message';
import {authSelector} from '../../../../store/auth/auth.selector';

interface UserCreation extends ClienteDTO {
    password: string
}
const componentClassName = 'UserSignUp'

interface UserSignUpProps {
    closeModal: () => void
}
export const UserSignUp = (props:UserSignUpProps) => {
    const {closeModal} = props;
    const [newUser, setNewUser] = useState<Partial<UserCreation>>();
    const [cardData, setCardData] = useState<Partial<CardDataDTO>>();
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isLoading = useSelector(authSelector.getIsLoadingRegister)
    const isError = useSelector(authSelector.getIsErrorRegister)

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando l\'account...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione dell\'account !'
            } as ArgsProps);
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Account creato con successo!'
            } as ArgsProps);
            closeModal();
        }
    }, [isLoading, isError])

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.nome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newUser?.nome}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, nome: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.cognome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newUser?.cognome}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, cognome: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.telefono) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Telefono
                </Title>
                <Input
                    placeholder="Telefono"
                    value={newUser?.telefono}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, telefono: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.documento) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Documento
                </Title>
                <Input
                    placeholder="Documento"
                    value={newUser?.documento}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, documento: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.username) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Username
                </Title>
                <Input
                    placeholder="Username"
                    value={newUser?.username}
                    onChange={(value) => {setNewUser(prevState => ({...prevState, username: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newUser?.password) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Password
                </Title>
                <Input
                    placeholder="Password"
                    type={'password'}
                    value={newUser?.password}
                    onChange={(e) => {setNewUser(prevState => ({...prevState, password:e.target.value}))}}/>
            </div>

            <hr/>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !cardData?.number) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Numero carta
                </Title>
                <Input
                    placeholder="Numero carta"
                    value={cardData?.number}
                    onChange={(value) => {setCardData(prevState => ({...prevState, number: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !cardData?.cvc) ? 'error-input' : ''}`}>
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

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !cardData?.exp_month) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Mese scadenza
                </Title>
                <Input
                    placeholder="Mese scadenza"
                    type={'number'}
                    min={1}
                    max={2}
                    value={cardData?.exp_month}
                    onChange={(value) => {setCardData(prevState => ({...prevState, exp_month: value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !cardData?.exp_year) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Anno scadenza
                </Title>
                <Input
                    type={'number'}
                    min={0}
                    max={99}
                    maxLength={2}
                    minLength={2}
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
                onClick={() => {
                    setHasClickedOnConfirm(true);
                    if(cardData && newUser && newUser.nome && newUser.cognome && newUser.username && newUser.telefono && newUser.documento &&
                        cardData.number && cardData.cvc && cardData.exp_month && cardData.exp_year) {
                        dispatch(loginActions.userRegister({
                            card: cardData,
                            user: newUser
                        }))
                    }
                }}>
                Registrati
            </Button>
        </div>

    )
}

export default UserSignUp;