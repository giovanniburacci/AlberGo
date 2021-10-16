import React, {useEffect, useState} from 'react';
import './hotel.scss'
import {ColumnsType} from 'antd/es/table';
import {Descriptions, Drawer} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Spin} from 'antd';
import {ClienteDTO} from '../../models/models';
import clientiSelector from '../../store/clienti/clienti.selector';
import clientiActions from '../../store/clienti/clienti.action';
import hotelSelector from '../../store/hotel/hotel.selector';

const componentClassName = 'Hotel';

const Hotel = () => {

    const hotel = useSelector(hotelSelector.getHotel);


    return (
            hotel ? (
                <div className={`${componentClassName}`}>
                    <div className={`${componentClassName}__column p-24`}>
                        <Descriptions title="Anagrafica dell'hotel e dell'amministratore" bordered>
                            <Descriptions.Item label="Nome hotel">{hotel.nome}</Descriptions.Item>
                            <Descriptions.Item label="Stelle">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Indirizzo">{hotel.indirizzo}</Descriptions.Item>
                            <Descriptions.Item label="Descrizione">{hotel.telefono}</Descriptions.Item>
                            <Descriptions.Item label="Usage Time" span={2}>
                                2019-04-24 18:00:00
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={3}>
                            </Descriptions.Item>
                            <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Config Info">
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1<br />
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className={`${componentClassName}__column`}>
                        aaaaa
                    </div>
                </div>
            ) : (
                <>
                </>
            )
    )
}

export default Hotel;