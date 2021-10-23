import React, {useEffect, useState} from 'react';
import './clienti.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Spin} from 'antd';
import {ClienteDTO} from '../../models/models';
import clientiSelector from '../../store/clienti/clienti.selector';
import clientiActions from '../../store/clienti/clienti.action';

const componentClassName = 'Clienti';

const Clienti = () => {

    const dispatch = useDispatch();
    const [selectedCliente, setSelectedCliente] = useState<ClienteDTO | undefined>();

    const isLoading = useSelector(clientiSelector.getIsLoading);
    const isError = useSelector(clientiSelector.getIsError); //todo gestire loading ed error
    const clienti = useSelector(clientiSelector.getClienti);

    useEffect(() => {
        dispatch(clientiActions.fetchClienti(1)) // todo gestire idHotel
    }, [])

    const selectCliente = (record:ClienteDTO) => {
        setSelectedCliente(record);
    }

    const columns:ColumnsType<ClienteDTO> = [{
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
    },
        {
            title: 'Cognome',
            dataIndex: 'cognome',
            key: 'cognome'
        },
        {
            title: 'Numero di telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Numero del documento',
            dataIndex: 'documento',
            key: 'documento'
        }];

    return (
        <>
            <div className={`${componentClassName}`}>
                {
                    isLoading ? (
                        <Spin size={'large'}/>
                    ) : isError ? (
                        <>boh</>
                    ) : (
                        <Table
                            onRow={(record,index) => {
                                return {
                                    onClick: () => {selectCliente(record)}
                                }
                            }}
                            columns={columns}
                            dataSource={clienti}
                            pagination={false}
                            rowKey={(row) => row.id}
                        />
                    )
                }
            </div>
            <Drawer
                destroyOnClose={true}
                visible={!!selectedCliente}
                onClose={() => {setSelectedCliente(undefined)}}
                title={'Dettaglio cliente'}
                width={'348px'}>
                { selectedCliente && (
                    <>
                    </> // todo aggiungere dettaglio cliente
                )
                }
            </Drawer>
        </>
    )
}

export default Clienti;