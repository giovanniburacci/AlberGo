import React from 'react';
import './dettaglioCliente.scss';
import {ClienteDTO} from '../../../models/models';
import {Checkbox, Input, InputNumber, Typography} from 'antd';

interface DettaglioClienteProps {
    selectedCliente?: ClienteDTO
}
const componentClassName = 'DettaglioCliente'
const {Title} = Typography;
export const DettaglioCliente = (props:DettaglioClienteProps) => {
    const {selectedCliente} = props;
    if(!selectedCliente) {
        return null;
    }
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome
                </Title>
                <Input disabled placeholder={'Nome'} value={selectedCliente.nome}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Cognome
                </Title>
                <Input disabled placeholder={'Cognome'} value={selectedCliente.cognome}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Telefono
                </Title>
                <Input disabled placeholder={'Telefono'} value={selectedCliente.telefono}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Documento
                </Title>
                <Input disabled placeholder={'Documento'} value={selectedCliente.documento}/>
            </div>
        </div>
    )
}

export default DettaglioCliente;

