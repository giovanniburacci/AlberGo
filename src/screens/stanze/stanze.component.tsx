import React, {useEffect, useState} from 'react';
import {Table, Typography} from 'antd'
import {Pie} from 'react-chartjs-2'
import './stanze.scss';
import {ColumnsType} from 'antd/es/table';
import {StanzaDTO} from '../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import stanzeActions from '../../store/stanze/stanze.action';
import stanzeSelector from '../../store/stanze/stanze.selector';

const componentClassName = 'Stanze';

const Stanze = () => {

    const {Title,Text} = Typography;

    let data = {}

    const dispatch = useDispatch();
    const stanze = useSelector(stanzeSelector.getStanze)
    const isLoading = useSelector(stanzeSelector.getIsLoading);
    const isError = useSelector(stanzeSelector.getIsError); //todo gestire loading ed error

    const [dataPie,setDataPie] = useState<{}>();

    useEffect( () => {
        dispatch(stanzeActions.fetchStanze(1))
    }, [])

    useEffect(() => {
        if(stanze) {
            console.log('fuoriServizio', stanze.filter(stanza => stanza.fuoriServizio).length);
            console.log('non fuoriServizio', stanze.length - stanze.filter(stanza => stanza.fuoriServizio).length);
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

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__column`}>
                <Table
                    columns={columns}
                    dataSource={stanze}/>
            </div>

            <div className={`${componentClassName}__column`}>
                <div className={`${componentClassName}__column__box bb`}>
                    {
                        dataPie && (
                            <Pie data={dataPie} />
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
                            <Pie data={dataPie} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Stanze;