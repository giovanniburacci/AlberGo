import React, {useEffect, useState} from 'react';
import {Input, Select, DatePicker} from 'antd';
import './prenotazioniFilters.scss'
import moment from 'moment';

interface SelectOptions {
    value: string,
    label: string
}

enum UtenteFilter  {
    COGNOME = 'cognome',
    NOME = 'nome'
}

const filterOptions:SelectOptions[] = [
    {
        value: 'cognome',
        label: 'Cognome'
    },
    {
        value: 'nome',
        label: 'Nome'
    }
];

const componentClassName = 'PrenotazioniFilters'
const {Option} = Select;
const {RangePicker} = DatePicker;
const PrenotazioniFilters = () => {
    const [utenteFilter, setUtenteFilter] = useState<UtenteFilter>(UtenteFilter.COGNOME)
    const [dateFilter, setDateFilter] = useState<[moment.Moment,moment.Moment | null]>()

    return (
        <div className={`${componentClassName}`}>
            <Input className={`${componentClassName}__input`} type={'text'}/>
            <Select className={`${componentClassName}__select`} defaultValue={UtenteFilter.COGNOME} value={utenteFilter} style={{ width: 120 }} onChange={setUtenteFilter}>
                {
                    filterOptions.map((option) => <Option value={option.value}>{option.label}</Option>)
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

export default PrenotazioniFilters;