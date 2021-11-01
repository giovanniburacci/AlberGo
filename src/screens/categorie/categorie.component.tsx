import React, {useEffect, useState} from 'react';
import {Drawer, Empty, Table} from 'antd';
import './categorie.scss';
import {ColumnsType} from 'antd/es/table';
import {CategoriaDTO} from '../../models/models';
import categorieActions from '../../store/categorie/categorie.action';
import categorieSelector from '../../store/categorie/categorie.selector';
import DettaglioCategoria from './dettaglioCategoria/dettaglioCategoria.component';
import {useDispatch, useSelector} from 'react-redux';
import PieContainer from '../../containers/pies/pieContainer/pie.component';
import CategorieBar from './categorieBar/categorieBar.component';
import NewCategoria from './newCategoria/newCategoria.component';
const componentClassName = 'Categorie';

const getRandomColor = ():string => 'rgb('+Math.floor(Math.random()*256)+', '+Math.floor(Math.random()*256)+', '+Math.floor(Math.random()*256)+')'
const Categorie = () => {

    const dispatch = useDispatch();
    const [selectedCategoria,setSelectedCategoria] = useState<CategoriaDTO>();
    const [hasClickedNew, setHasClickedNew] = useState<boolean>(false);
    const [dataPie, setDataPie] = useState<{}>();

    const categorie = useSelector(categorieSelector.getCategorie);
    const isLoading = useSelector(categorieSelector.getIsLoading);
    const numeroStanze = useSelector(categorieSelector.getNumeroStanze)

    // todo gestire loading ed error
    useEffect(() => {
        if(!isLoading) {
            dispatch(categorieActions.fetchCategorie(1)); // todo gestire idHotel
        }
    },[])

    useEffect(() => {

    }, [categorie])

    useEffect(() => {
        if(categorie && categorie.length > 0 && numeroStanze) {
            console.log('numStanze', numeroStanze)
            categorie.forEach(c => {
                const stanza = numeroStanze.find(s => s.hasOwnProperty(c.id))
                if(stanza) {
                    console.log('countStanze', stanza[c.id])
                }
            })
            setDataPie({
                labels: categorie.map(c => c.nome),
                datasets: [{
                    label: 'Stato delle stanze',
                    data: numeroStanze.map(n => n[categorie.find(c => n.hasOwnProperty(c.id))!.id]),
                    backgroundColor: categorie.map(() => getRandomColor()),
                    hoverOffset: 2
                }]
            })
        }
    }, [categorie, numeroStanze])
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
                    <CategorieBar setHasClickedNew={() => {setHasClickedNew(true)}}/>
                    <Table
                        columns={columns}
                        dataSource={categorie}
                        onRow={(categoria) => {
                            return {
                                onClick: () => setSelectedCategoria(categoria)
                            }
                        }}
                        rowKey={(row) => row.id}/>
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
                                <PieContainer data={dataPie} />
                            )
                        }
                    </div>
                </div>
                <Drawer
                    destroyOnClose={true}
                    headerStyle={{
                        background: '#191919',
                        color: '#ffffff !important'
                    }}
                    visible={hasClickedNew}
                    className={'ant-drawer-title-white'}
                    onClose={() => {setHasClickedNew(false)}}
                    title={'Nuova categoria'}
                    width={'348px'}>
                    <NewCategoria/>
                </Drawer>
            </div>
        </>
    )
}

export default Categorie;