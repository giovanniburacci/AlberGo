import React, {useState} from 'react';
import {Table} from 'antd';
import './categorie.scss';
import {ColumnsType} from 'antd/es/table';
import {CategoriaDTO} from '../../models/models';
import {getCategorieStub} from '../../mocks/stubs/categorie';
import {Pie} from 'react-chartjs-2';
const componentClassName = 'Categorie';

const Categorie = () => {

    const categorie = getCategorieStub();

    const [selectedCategorie,setSelectedCategoria] = useState<CategoriaDTO>(categorie[0]);

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
                        dataSource={categorie}/>
                </div>

                <div className={`${componentClassName}__column`}>
                    <div className={`${componentClassName}__column__box bb`}>

                    </div>

                    <div className={`${componentClassName}__column__box bb`}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorie;