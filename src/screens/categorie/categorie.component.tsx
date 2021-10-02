import React, {useEffect, useState} from 'react';
import {Empty, Table} from 'antd';
import './categorie.scss';
import {ColumnsType} from 'antd/es/table';
import {CategoriaDTO} from '../../models/models';
import categorieActions from '../../store/categorie/categorie.action';
import categorieSelector from '../../store/categorie/categorie.selector';
import {Pie} from 'react-chartjs-2';
import DettaglioCategoria from './dettaglioCategoria/dettaglioCategoria.component';
import {useDispatch, useSelector} from 'react-redux';
const componentClassName = 'Categorie';

const Categorie = () => {

    const dispatch = useDispatch();
    const [selectedCategoria,setSelectedCategoria] = useState<CategoriaDTO>();
    const [dataPie, setDataPie] = useState<{}>();

    const categorie = useSelector(categorieSelector.getCategorie);
    // todo gestire loading ed error
    useEffect(() => {
        dispatch(categorieActions.fetchCategorie(1));
    },[])

    useEffect(() => {
        if(categorie) {
            setDataPie({
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
            })
        }
    }, [categorie])
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
                        {
                            dataPie && (
                                <Pie data={dataPie} /> // todo gestire refresh component
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorie;