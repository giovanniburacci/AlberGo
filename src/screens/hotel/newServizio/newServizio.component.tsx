import React, {useState} from 'react';
import {Input, Typography, Select, Spin, Button, InputNumber} from 'antd';
import './newServizio.scss';
import {ServizioDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import serviziActions from '../../../store/servizi/servizi.action';
import hotelSelector from '../../../store/hotel/hotel.selector';

const componentClassName = 'NewServizio';
const NewServizio = () => {

    const {Title} = Typography;
    const dispatch = useDispatch();
    const [newServizio, setNewServizio] = useState<Partial<ServizioDTO>>();
    const idHotel = useSelector(hotelSelector.getHotelId)

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome del servizio
                </Title>
                <Input placeholder="Nome" onChange={(event) => {
                    setNewServizio((prevState => {
                        return {
                            ...prevState,
                            nome: event.target.value
                        }
                    }))
                }} value={newServizio?.nome}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Prezzo
                </Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'€'}
                    value={newServizio?.prezzo}
                    onChange={(value) => {
                        setNewServizio(prevState => {
                            return {
                                ...prevState,
                                prezzo: value
                            }
                        })
                    }}/>
            </div>
            <Button onClick={() => {
                if(newServizio && newServizio.prezzo && newServizio.nome) {
                    dispatch(serviziActions.addServizio({
                        ...newServizio,
                        idHotel
                    }));
                }
            }}>Conferma</Button>
        </div>
    )
}

export default NewServizio;