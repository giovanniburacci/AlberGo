import React, {useEffect, useState} from 'react';
import {Drawer, Empty, Spin, Table, Typography} from 'antd'
import './stanze.scss';
import {ColumnsType} from 'antd/es/table';
import {StanzaDTO} from '../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import stanzeActions from '../../store/stanze/stanze.action';
import stanzeSelector from '../../store/stanze/stanze.selector';
import StanzeBar from './stanzeBar/stanzeBar.component';
import NewStanza from './newStanza/newStanza.component';
import PieContainer from '../../containers/pies/pieContainer/pie.component';
import DettaglioStanza from './dettaglioStanza/dettaglioStanza.component';
import {StanzaStatus, StanzaWithStatus} from '../../store/stanze/types';
import moment from 'moment';
import hotelSelector from '../../store/hotel/hotel.selector';

const componentClassName = 'Stanze';
const columns:ColumnsType<StanzaDTO> = [{
    title: 'Stanza',
    dataIndex: 'numeroStanza',
    key: 'numeroStanza',
},
    {
        title: 'Descrizione',
        dataIndex: 'descrizione',
        key: 'descrizione'
    }];
const Stanze = () => {

    const {Title,Text} = Typography;

    const dispatch = useDispatch();
    const stanze = useSelector(stanzeSelector.getStanze)
    const isLoading = useSelector(stanzeSelector.getIsLoading);
    const isError = useSelector(stanzeSelector.getIsError);
    const idHotel = useSelector(hotelSelector.getHotelId)
    const categorieFilter = useSelector(stanzeSelector.getCategoriaFilter)
    const [dataPie,setDataPie] = useState<{}>();
    const [filteredDataPie,setFilteredDataPie] = useState<{} | undefined>();
    const [hasClickedNew, setHasClickedNew] = useState<boolean>(false)
    const [selectedStanza, setSelectedStanza] = useState<StanzaWithStatus | undefined>();
    const [dateFilter, setDateFilter] = useState<[moment.Moment,moment.Moment] | null>();

    useEffect( () => {
        if(idHotel) {
            dispatch(stanzeActions.fetchStanze(idHotel))
        }
    }, [idHotel])

    useEffect(() => {
        if(!stanze || stanze.length === 0) {
            setDataPie({});
        } else {
            setDataPie({
                labels: ['Fuori Servizio', 'Disponibile'],
                datasets: [{
                    label: 'Stato delle stanze',
                    data: [
                        stanze.reduce((acc, s) => (
                            acc + (s.fuoriServizio ? 1 : 0)
                        ), 0),
                        stanze.reduce((acc, s) => (
                            acc + (!s.fuoriServizio ? 1 : 0)
                        ), 0)],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 2
                }]
            });
            if (stanze[0].status) {
                setFilteredDataPie({
                    labels: ['Libere', 'Occupate'],
                    datasets: [{
                        label: 'Stato delle stanze',
                        data: [
                            stanze.reduce((acc, s) => (
                                acc + (s.status === StanzaStatus.LIBERA ? 1 : 0)
                            ), 0),
                            stanze.reduce((acc, s) => (
                                acc + (s.status === StanzaStatus.OCCUPATA ? 1 : 0)
                            ), 0)],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 2
                    }]
                })
            } else {
                setFilteredDataPie(undefined);
            }
        }
    }, [stanze, categorieFilter])

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__column`}>
                <StanzeBar
                    setHasClickedNew={() => {setHasClickedNew(true)}}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />
                {
                    isLoading ? (
                        <Spin />
                    ) : isError ? (
                        <Empty />
                    ) : (
                        <Table
                            columns={(stanze && stanze.length > 0 && stanze[0].status) ? (
                                [...columns, {
                                    title: 'Stato',
                                    dataIndex: 'status',
                                    key: 'status'
                                }]
                            ): columns}
                            dataSource={stanze}
                            rowKey={(row) => row.id}
                            onRow={(record,index) => {
                                return {
                                    onClick: () => {
                                        if(stanze) {
                                            setSelectedStanza(stanze.find(s => s.id === record.id))
                                        }
                                    }
                                }
                            }}
                        />
                    )
                }
            </div>

            <div className={`${componentClassName}__column`}>
                <div className={`${componentClassName}__column__box bb`}>
                    {
                        !!filteredDataPie && (
                            <>
                                <PieContainer data={filteredDataPie}/>
                                <div>
                                    <div className={`${componentClassName}__column__box__spacing`}>
                                        <Title level={3}>{
                                            stanze?.reduce((acc,s) => (
                                                acc + (s.status === StanzaStatus.LIBERA ? 1 : 0)
                                            ), 0)
                                        }</Title>
                                        <Text type={'secondary'}>stanze sono libere</Text>
                                    </div>
                                    <Title level={3}>{
                                        stanze?.reduce((acc,s) => (
                                            acc + (s.status === StanzaStatus.OCCUPATA ? 1 : 0)
                                        ), 0)
                                    }</Title>
                                    <Text type={'secondary'}>stanze sono occupate</Text>
                                </div>
                            </>
                        )
                    }
                </div>

                <div className={`${componentClassName}__column__box`}>
                    {
                        stanze && (
                            <div>
                                <div className={`${componentClassName}__column__box__spacing`}>
                                    <Title level={3}>{stanze.reduce((acc,s) => (
                                        acc + (!s.fuoriServizio ? 1 : 0)
                                    ), 0)}</Title>
                                    <Text type={'secondary'}>stanze sono disponibili</Text>
                                </div>
                                <Title level={3}>{stanze.reduce((acc,s) => (
                                    acc + (s.fuoriServizio ? 1 : 0)
                                ), 0)}</Title>
                                <Text type={'secondary'}>stanze sono fuori servizio</Text>
                            </div>
                        )
                    }
                    {
                        dataPie && (
                            <PieContainer data={dataPie}/>
                        )
                    }
                </div>
                <Drawer
                    destroyOnClose={true}
                    className={'ant-drawer-title-white'}
                    visible={hasClickedNew}
                    onClose={() => {setHasClickedNew(false)}}
                    title={'Nuova stanza'}
                    width={'348px'}>
                    <NewStanza closeDrawer={() => setHasClickedNew(false)}/>
                </Drawer>
                <Drawer
                    destroyOnClose={true}
                    className={'ant-drawer-title-white'}
                    visible={!!selectedStanza}
                    onClose={() => {setSelectedStanza(undefined)}}
                    title={'Dettaglio stanza'}
                    width={'348px'}>
                    <DettaglioStanza resetFilters={() => {setDateFilter(undefined)}}stanza={selectedStanza!} closeDrawer={() => setSelectedStanza(undefined)}/>
                </Drawer>
            </div>
        </div>
    )
}

export default Stanze;