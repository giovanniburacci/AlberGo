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
interface StanzeFilterProps {
    dateFilter?: [moment.Moment, moment.Moment] | null,
    setDateFilter: (dates:[moment.Moment, moment.Moment] | null | undefined) => void
}

let renderCount = 0;
const StanzeFilters = (props: StanzeFilterProps) => {
    const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDTO>()
    const listaCategorie = useSelector(categorieSelector.getCategorie)
    const {dateFilter, setDateFilter} = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if(dateFilter) {
            const [dataInizio, dataFine] = dateFilter;
            if (dataInizio && dataFine) {
                // @ts-ignore
                dispatch(stanzeActions.fetchStanzeWithDates({
                    dataInizio,
                    dataFine,
                    idCategoria: selectedCategoria?.id,
                    idHotel: 1 //todo handle hotel id
                }));
                renderCount ++;
            }
        } else { // caso di nessun filtro
            if(renderCount !== 0) {
                dispatch(stanzeActions.fetchStanze(1)) //handle hotel id
            }
        }
    }, [dateFilter])

    useEffect(() => {
        return () => {
            renderCount = 0;
        }
    }, [])

    useEffect(() => {
        dispatch(stanzeActions.filterBySelectedCategoria(selectedCategoria?.id))
    }, [selectedCategoria])

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