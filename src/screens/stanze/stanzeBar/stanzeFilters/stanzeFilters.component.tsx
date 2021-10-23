import React, {useEffect, useState} from 'react';
import {DatePicker, Select, Spin} from 'antd';
import './stanzeFilters.scss'
import moment from 'moment';
import categorieSelector from '../../../../store/categorie/categorie.selector';
import {useDispatch, useSelector} from 'react-redux';
import {CategoriaDTO} from '../../../../models/models';
import categorieActions from '../../../../store/categorie/categorie.action';
import stanzeActions from '../../../../store/stanze/stanze.action';


const componentClassName = 'StanzeFilters'
const {RangePicker} = DatePicker;
const {Option} = Select;

const StanzeFilters = () => {
    const [dateFilter, setDateFilter] = useState<[moment.Moment,moment.Moment | null]>();
    const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDTO>()
    const listaCategorie = useSelector(categorieSelector.getCategorie)

    const dispatch = useDispatch();
    useEffect(() => {
        if(dateFilter && !selectedCategoria) {
            const [dataInizio, dataFine] = dateFilter;
            if (dataInizio && dataFine) {
                dispatch(stanzeActions.fetchStanzeLibereWithDates({
                    dataInizio,
                    dataFine,
                    idHotel: 1 //todo handle hotel id
                }));
            }
        } else if(!dateFilter && selectedCategoria) {
            // todo aggiungere caso
        } else { // caso di nessun filtro
            dispatch(stanzeActions.fetchStanze(1)) //handle hotel id
        }
    }, [selectedCategoria, dateFilter])

    if(!listaCategorie) {
        dispatch(categorieActions.fetchCategorie(1)) //todo handle hotelId
        return <Spin/>
    }

    return (
        <div className={`${componentClassName}`}>

            <Select
                allowClear={true}
                className={`${componentClassName}__select`}
                showSearch
                placeholder="Categoria"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                    onChange={(value) => {setSelectedCategoria(listaCategorie.find(categoria => categoria.id === value))}}
            >
                {
                    listaCategorie.map(categoria => (
                        <Option value={categoria.id} key={categoria.id}>{categoria.nome}</Option>
                    ))
                }
            </Select>
            <RangePicker
                className={`${componentClassName}__range-picker`}
                value={dateFilter}
                onChange={(dates) => {
                    setDateFilter(dates as [moment.Moment,moment.Moment])
                }}/>
        </div>
    )
};

export default StanzeFilters;