import React, {useState} from 'react';
import {Input} from 'antd';
import Title from 'antd/es/typography/Title';
import {AmministratoreDTO, HotelDTO} from '../../../../../../models/models';
import './onlyAccount.scss'
const componentClassName = 'OnlyAccount';

interface AdminCreation extends AmministratoreDTO {
    password: string,
    publicKey: string
}
export const OnlyAccount = () => {

    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input
                    placeholder="Nome"
                    value={newAdmin?.nome}
                    onChange={(value) => {setNewAdmin(prevState => ({...prevState, nome:value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input
                    placeholder="Cognome"
                    value={newAdmin?.cognome}
                    onChange={(value) => {setNewAdmin(prevState => ({...prevState, cognome:value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Username
                </Title>
                <Input
                    placeholder="Username"
                    value={newAdmin?.username}
                    onChange={(value) => {setNewAdmin(prevState => ({...prevState, username:value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Codice dell'hotel
                </Title>
                <Input
                    placeholder="Codice hotel"
                    value={newAdmin?.publicKey}
                    onChange={(value) => {setNewAdmin(prevState => ({...prevState, publicKey:value.target.value}))}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Password
                </Title>
                <Input
                    placeholder="Password"
                    type={'password'}
                    value={newAdmin?.password}
                    onChange={(value) => {setNewAdmin(prevState => ({...prevState, password:value.target.value}))}}/>
            </div>

        </div>
    )
}

export default OnlyAccount;