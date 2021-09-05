import React from 'react';
import {Table, Typography} from 'antd'
import {Pie} from 'react-chartjs-2'
import './stanze.scss';
import {ColumnsType} from 'antd/es/table';
import {StanzaDTO} from '../../models/models';
import {getStanzeStub} from '../../mocks/stubs/stanze';

const componentClassName = 'Stanze';

const Stanze = () => {

    const {Title,Text} = Typography;

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

    const stanze = getStanzeStub().map(stanza => {
        return {
            ...stanza,
            stato: stanza.fuoriServizio ? 'Fuori servizio' : 'Libera'
        }
    });

    const data = {
        labels: ['Fuori Servizio', 'Libera'],
        datasets: [{
            label: 'Stato delle stanze',
            data: [
                stanze.filter(stanza => stanza.fuoriServizio ).length,
                stanze.length - stanze.filter(stanza => stanza.fuoriServizio).length
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 2
        }]
    }
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__column`}>
                <Table
                    columns={columns}
                    dataSource={stanze}/>
            </div>

            <div className={`${componentClassName}__column`}>
                <div className={`${componentClassName}__column__box bb`}>
                    <Pie data={data} />
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
                    <Pie data={data} />
                </div>
            </div>
        </div>
    )
}

export default Stanze;