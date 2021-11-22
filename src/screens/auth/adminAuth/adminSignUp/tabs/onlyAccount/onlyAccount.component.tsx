import React, {useState} from 'react';
import {Input} from 'antd';
import Title from 'antd/es/typography/Title';
import './onlyAccount.scss'
import {AdminCreation} from '../../../types';
const componentClassName = 'OnlyAccount';

interface OnlyAccountProps {
    isCreatingHotel: boolean,
    newAdmin?: Partial<AdminCreation>,
    setNewAdmin:  (item:string, value: string) => void
}
export const OnlyAccount = (props:OnlyAccountProps) => {
    const {isCreatingHotel, setNewAdmin, newAdmin} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newAdmin?.nome}
                    onChange={(value) => {setNewAdmin('nome',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input
                    placeholder="Cognome"
                    value={newAdmin?.cognome}
                    onChange={(value) => {setNewAdmin('cognome',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Username
                </Title>
                <Input
                    placeholder="Username"
                    value={newAdmin?.username}
                    onChange={(value) => {setNewAdmin('username',value.target.value)}}/>
            </div>

            {
                !isCreatingHotel && (
                    <div className={`${componentClassName}__inputgroup`}>
                        <Title level={5}>
                            Codice dell'hotel
                        </Title>
                        <Input
                            placeholder="Codice hotel"
                            value={newAdmin?.publicKey}
                            onChange={(value) => {setNewAdmin('publicKey',value.target.value)}}/>
                    </div>
                )
            }

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Password
                </Title>
                <Input
                    placeholder="Password"
                    type={'password'}
                    value={newAdmin?.password}
                    onChange={(value) => {setNewAdmin('password',value.target.value)}}/>
            </div>

        </div>
    )
}

export default OnlyAccount;