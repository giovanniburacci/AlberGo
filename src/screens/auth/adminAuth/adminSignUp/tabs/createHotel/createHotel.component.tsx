import React from 'react';
import Title from 'antd/es/typography/Title';
import {Input} from 'antd';
import './createHotel.scss'
import {HotelDTO} from '../../../../../../models/models';
const componentClassName = 'CreateHotel'

interface CreateHotelProps {
    newHotel?: Partial<HotelDTO>
    setNewHotel: (item:string, value: string) => void
}
export const CreateHotel = (props:CreateHotelProps) => {
    const {newHotel, setNewHotel} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome hotel
                </Title>
                <Input
                    placeholder="Nome"
                    value={newHotel?.nome}
                    onChange={(value) => {setNewHotel('nome',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Indirizzo hotel
                </Title>
                <Input
                    placeholder="Indirizzo"
                    value={newHotel?.indirizzo}
                    onChange={(value) => {setNewHotel('indirizzo',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Descrizione hotel
                </Title>
                <Input
                    placeholder="Descrizione"
                    value={newHotel?.descrizione}
                    onChange={(value) => {setNewHotel('descrizione',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Telefono hotel
                </Title>
                <Input
                    placeholder="Telefono"
                    value={newHotel?.telefono}
                    onChange={(value) => {setNewHotel('telefono',value.target.value)}}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Chiave account Stripe
                </Title>
                <Input
                    placeholder="Telefono"
                    value={newHotel?.publicKey}
                    onChange={(value) => {setNewHotel('publicKey',value.target.value)}}/>
            </div>

        </div>
    )
}

export default CreateHotel;