import React, {useState} from 'react';
import {Input} from 'antd';
import Title from 'antd/es/typography/Title';
import './onlyAccount.scss'
import {AdminCreation} from '../../../types';
const componentClassName = 'OnlyAccount';

interface OnlyAccountProps {
    isCreatingHotel: boolean,
    newAdmin?: Partial<AdminCreation>,
    setNewAdmin:  (item:string, value: string) => void,
    hotelKey?: string,
    setHotelKey?: (newValue: string) => void,
    hasClickedOnConfirm: boolean,
}
export const OnlyAccount = (props:OnlyAccountProps) => {
    const {isCreatingHotel, setNewAdmin, newAdmin, hotelKey, setHotelKey, hasClickedOnConfirm} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newAdmin?.nome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newAdmin?.nome}
                    onChange={(e) => {setNewAdmin('nome',e.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newAdmin?.cognome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input
                    placeholder="Cognome"
                    value={newAdmin?.cognome}
                    onChange={(e) => {setNewAdmin('cognome',e.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newAdmin?.username) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Username
                </Title>
                <Input
                    placeholder="Username"
                    value={newAdmin?.username}
                    onChange={(e) => {setNewAdmin('username',e.target.value)}}/>
            </div>

            {
                (!isCreatingHotel && (typeof setHotelKey === 'function')) && (
                    <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !hotelKey) ? 'error-input' : ''}`}>
                        <Title level={5}>
                            Codice dell'hotel
                        </Title>
                        <Input
                            placeholder="Codice hotel"
                            value={hotelKey}
                            onChange={(e) => setHotelKey(e.target.value)}/>
                    </div>
                )
            }

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newAdmin?.password) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Password
                </Title>
                <Input
                    placeholder="Password"
                    type={'password'}
                    value={newAdmin?.password}
                    onChange={(e) => {setNewAdmin('password',e.target.value)}}/>
            </div>

        </div>
    )
}

export default OnlyAccount;