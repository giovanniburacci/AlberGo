import React, {useEffect, useState} from 'react';
import {DatePicker, Select} from 'antd';
import './stanzeFilters.scss'
import moment from 'moment';
import categorieSelector from '../../../../store/categorie/categorie.selector';
import {useSelector} from 'react-redux';
import {CategoriaDTO} from '../../../../models/models';


const componentClassName = 'StanzeFilters'
const {RangePicker} = DatePicker;
const {Option} = Select;

const StanzeFilters = () => {
    const [dateFilter, setDateFilter] = useState<[moment.Moment,moment.Moment | null]>();
    const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDTO>()
    const listaCategorie = useSelector(categorieSelector.getCategorie)
    useEffect(() => {
        console.log(dateFilter)
    }, [dateFilter])

    if(!listaCategorie) {
        return null;
    }

    return (
        <div className={`${componentClassName}`}>

            <Select
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