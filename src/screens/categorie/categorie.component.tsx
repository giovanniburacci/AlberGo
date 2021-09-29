import React, {useState} from 'react';
import {Empty, Table} from 'antd';
import './categorie.scss';
import {ColumnsType} from 'antd/es/table';
import {CategoriaDTO} from '../../models/models';
import {getCategorieStub} from '../../mocks/stubs/categorie';
import {Pie} from 'react-chartjs-2';
import DettaglioCategoria from './dettaglioCategoria/dettaglioCategoria.component';
const componentClassName = 'Categorie';

const categorie = getCategorieStub();

const data = {
    labels: categorie.map(categorie => categorie.nome).slice(0,2),
    datasets: [{
        label: 'Stato delle stanze',
        data: [
            1,1
        ],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
    }]
}
const Categorie = () => {

    const [selectedCategoria,setSelectedCategoria] = useState<CategoriaDTO>();

    const columns:ColumnsType<CategoriaDTO> = [{
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
    },
        {
            title: 'Prezzo',
            dataIndex: 'prezzo',
            key: 'prezzo'
        }]

    return (
        <>
            <div className={`${componentClassName}`}>
                <div className={`${componentClassName}__column`}>
                    <Table
                        columns={columns}
                        dataSource={categorie}
                        onRow={(categoria) => {
                            return {
                                onClick: () => setSelectedCategoria(categoria)
                            }
                        }}/>
                </div>

                <div className={`${componentClassName}__column`}>
                    <div className={`${componentClassName}__column__box bb`}>
                        {
                            selectedCategoria ? (
                                <DettaglioCategoria categoria={selectedCategoria}/>
                            ) : (
                                <Empty className={`${componentClassName}__column__box__center-margin bb`} description={false}/>
                            )
                        }
                    </div>

                    <div className={`${componentClassName}__column__box`}>
                        <Pie data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorie;