import React, {useEffect} from 'react';
import {Empty, Spin, Table} from 'antd';
import {HotelDTO} from '../../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import {hotelsSelector} from '../../../../store/hotels/hotels.selector';
import {ColumnsType} from 'antd/es/table';
import {hotelsActions} from '../../../../store/hotels/hotels.action';

interface HotelsListProps {
    setSelectedHotel: (record?: HotelDTO) => void
}

const columns:ColumnsType<HotelDTO> = [{
    title: 'Nome hotel',
    dataIndex: 'nome',
    key: 'nome',
},
    {
        title: 'Indirizzo',
        dataIndex: 'indirizzo',
        key: 'indirizzo'
    },
    {
        title: 'Telefono',
        dataIndex: 'telefono',
        key: 'telefono',
    },
    {
        title: 'Descrizione',
        dataIndex: 'descrizione',
        key: 'descrizione'
    }];

export const HotelsList = (props: HotelsListProps) => {

    const {setSelectedHotel} = props
    const isLoading = useSelector(hotelsSelector.getIsLoading);
    const isError = useSelector(hotelsSelector.getIsError);
    const hotels = useSelector(hotelsSelector.getHotels)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hotelsActions.fetchHotels())
    }, [])
    return (
        isLoading ? (
            <Spin />
        ) : isError ? (
            <Empty />
        ) : (
            <Table
                onRow={(record,index) => {
                    return {
                        onClick: () => {
                            if(hotels) {
                                setSelectedHotel(hotels.find(h => record.id === h.id))
                            }}
                    }
                }}
                columns={columns}
                dataSource={hotels}
                pagination={false}
                rowKey={(row) => row.id}
            />
        )
    )
}
export default HotelsList;