import React, {useEffect, useMemo, useState} from 'react';
import {Drawer, Table, Typography} from 'antd'
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
    },
    {
        title: 'Stato',
        dataIndex: 'stato',
        key: 'stato',
    }];
const Stanze = () => {

    const {Title,Text} = Typography;

    const dispatch = useDispatch();
    const stanze = useSelector(stanzeSelector.getStanze)
    const isLoading = useSelector(stanzeSelector.getIsLoading);
    const isError = useSelector(stanzeSelector.getIsError); //todo gestire loading ed error

    const [dataPie,setDataPie] = useState<{}>();
    const [hasClickedNew, setHasClickedNew] = useState<boolean>(false)
    const [selectedStanza, setSelectedStanza] = useState<StanzaDTO | undefined>();

    useEffect( () => {
        dispatch(stanzeActions.fetchStanze(1)) //todo gestire idHotel
    }, [])

    useEffect(() => {
        if(stanze) {
            setDataPie({
                labels: ['Fuori Servizio', 'Libera'],
                datasets: [{
                    label: 'Stato delle stanze',
                    data: [
                        stanze.filter(stanza => stanza.fuoriServizio).length,
                        stanze.length - stanze.filter(stanza => stanza.fuoriServizio).length
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 2
                }]
            });
        }
    }, [stanze])

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__column`}>
                <StanzeBar setHasClickedNew={() => {setHasClickedNew(true)}}/>
                <Table
                    columns={columns}
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
            </div>

            <div className={`${componentClassName}__column`}>
                <div className={`${componentClassName}__column__box bb`}>
                    {
                        dataPie && (
                            <PieContainer data={dataPie}/>
                        )
                    }
                    <div>
                        <div className={`${componentClassName}__column__box__spacing`}>
                            <Title level={3}>X</Title>
                            <Text type={'secondary'}>stanze sono libere</Text>
                        </div>
                        <Title level={3}>X</Title>
                        <Text type={'secondary'}>stanze sono fuori servizio</Text>
                    </div>
                </div>

                <div className={`${componentClassName}__column__box`}>
                    <div>
                        <div className={`${componentClassName}__column__box__spacing`}>
                            <Title level={3}>X</Title>
                            <Text type={'secondary'}>stanze sono libere</Text>
                        </div>
                        <Title level={3}>X</Title>
                        <Text type={'secondary'}>stanze sono fuori servizio</Text>
                    </div>
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
                    <NewStanza/>
                </Drawer>
                <Drawer
                    destroyOnClose={true}
                    className={'ant-drawer-title-white'}
                    visible={!!selectedStanza}
                    onClose={() => {setSelectedStanza(undefined)}}
                    title={'Dettaglio stanza'}
                    width={'348px'}>
                    <DettaglioStanza stanza={selectedStanza!}/>
                </Drawer>
            </div>
        </div>
    )
}

export default Stanze;