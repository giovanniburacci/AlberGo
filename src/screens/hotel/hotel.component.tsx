import React, {useEffect, useState} from 'react';
import './hotel.scss'
import {ColumnsType} from 'antd/es/table';
import {Descriptions, Drawer, Table} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Spin, Rate} from 'antd';
import hotelSelector from '../../store/hotel/hotel.selector';
import {ServizioDTO} from '../../models/models';
import {getServiziStub} from '../../mocks/stubs/servizi';
import Servizio from './servizio/servizio.component';
import serviziSelector from '../../store/servizi/servizi.selector';
import serviziActions from '../../store/servizi/servizi.action';
import ServiziBar from './serviziBar/serviziBar.component';
import NewServizio from './newServizio/newServizio.component';

const componentClassName = 'Hotel';
const columns:ColumnsType<ServizioDTO> = [{
    title: 'Servizio',
    dataIndex: 'nome',
    key: 'nome',
},
    {
        title: 'Prezzo',
        dataIndex: 'prezzo',
        key: 'prezzo'
    }];
const Hotel = () => {

    const [hasClickedNew, setHasClickedNew] = useState<boolean>(false);
    const [selectedServizio, setSelectedServizio] = useState<ServizioDTO | null>();

    const dispatch = useDispatch();
    const hotel = useSelector(hotelSelector.getHotel);
    const admin = useSelector(hotelSelector.getAmministratore);
    const servizi = useSelector(serviziSelector.getServizi)
    const idHotel = useSelector(hotelSelector.getHotelId)

    useEffect(() => {
        if(idHotel) {
            dispatch(serviziActions.fetchServizi(idHotel))
        }
    }, [idHotel])


    return (
        (hotel && admin)? (
            <>
                <div className={`${componentClassName}`}>
                    <div className={`${componentClassName}__column p-24`}>
                        <Descriptions title="Dati dell'hotel" bordered>
                            <Descriptions.Item label="Nome hotel" span={2}>{hotel.nome}</Descriptions.Item>
                            <Descriptions.Item label="Stelle" ><Rate disabled defaultValue={hotel.stelle}  /></Descriptions.Item>
                            <Descriptions.Item label="Indirizzo" span={3}>{hotel.indirizzo}</Descriptions.Item>
                            <Descriptions.Item label="Descrizione" span={3}>{hotel.descrizione}</Descriptions.Item>
                        </Descriptions>
                        <div className={`${componentClassName}__column__anagrafica`}>
                            <Descriptions title="Anagrafica dell'amministratore" bordered>
                                <Descriptions.Item label="Nome" span={2}>{admin.nome}</Descriptions.Item>
                                <Descriptions.Item label="Cognome" >{admin.cognome}</Descriptions.Item>
                                <Descriptions.Item label="username" span={3}>{admin.username}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                    <div className={`${componentClassName}__column`}>
                        <ServiziBar setHasClickedNew={() => {setHasClickedNew(true)}}/>
                        {
                            servizi && (
                                <Table
                                    dataSource={servizi}
                                    columns={columns}
                                    rowKey={(row) => row.id}
                                    onRow={(record,index) => {
                                        return {
                                            onClick: () => {setSelectedServizio(record)}
                                        }}}/>
                            )
                        }
                    </div>
                </div>
                <Drawer
                    destroyOnClose={true}
                    className={'ant-drawer-title-white'}
                    visible={!!selectedServizio}
                    onClose={() => {setSelectedServizio(null)}}
                    title={'Dettaglio servizio'}
                    width={'348px'}>
                    {
                        selectedServizio && (
                            <Servizio servizio={selectedServizio} closeDrawer={() => setSelectedServizio(undefined)}/>
                        )
                    }
                </Drawer>
                <Drawer
                    destroyOnClose={true}
                    className={'ant-drawer-title-white'}
                    visible={hasClickedNew}
                    onClose={() => {setHasClickedNew(false)}}
                    title={'Nuovo servizio'}
                    width={'348px'}>
                    <NewServizio closeDrawer={() => setHasClickedNew(false)}/>
                </Drawer>
            </>
        ) : (
            <>
            </>
        )
    )
}

export default Hotel;