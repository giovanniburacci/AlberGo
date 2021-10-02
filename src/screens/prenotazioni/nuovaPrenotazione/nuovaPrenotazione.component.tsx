import React from 'react';
import {DatePicker, Input, Typography, Select} from 'antd';
import './nuovaPrenotazione.scss';
import { UserOutlined } from '@ant-design/icons';

const componentClassName = 'NuovaPrenotazione';
const NuovaPrenotazione = () => {

    const {Title} = Typography;
    const {Option} = Select;

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <div className={`${componentClassName}__inputgroup__name-labels`} >
                    <Title level={5}>
                        Nome
                    </Title>
                    <Title level={5}>
                        Cognome
                    </Title>
                </div>
                <Input.Group compact>
                    <Input style={{ width: '50%' }} placeholder={'Nome'}/>
                    <Input style={{ width: '50%' }} placeholder={'Cognome'}/>
                </Input.Group>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Data check-in</Title>
                <DatePicker
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Data check-out</Title>
                <DatePicker
                    className={`${componentClassName}__inputgroup__datepicker`}
                />
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <div className={`${componentClassName}__inputgroup__name-labels`}>
                    <div style={{width: '40%'}}>
                        <Title level={5}>
                            Categoria
                        </Title>
                        <Select
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Categoria"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                // @ts-ignore
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Bella</Option>
                            <Option value="lucy">Brutta</Option>
                            <Option value="tom">Lusso</Option>
                        </Select>
                    </div>
                    <div style={{width: '40%'}}>
                        <Title level={5}>
                            Stanza
                        </Title>
                        <Select
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Stanza"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                // @ts-ignore
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                </div>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <div className={`${componentClassName}__inputgroup__name-labels`} >
                    <Title level={5}>
                        Prefisso
                    </Title>
                    <Title level={5}>
                        Telefono
                    </Title>
                </div>
                <Input.Group compact>
                    <Input style={{ width: '30%' }} placeholder={'+..'}/>
                    <Input style={{ width: '70%' }} placeholder={'Telefono'}/>
                </Input.Group>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Documento
                </Title>
                <Input placeholder="Documento" prefix={<UserOutlined />} />
            </div>

        </div>
    )
}

export default NuovaPrenotazione;