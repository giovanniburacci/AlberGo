import React, {useEffect, useState} from 'react';
import {Input, Select, DatePicker} from 'antd';
import './prenotazioniFilters.scss'
import moment from 'moment';
import {prenotazioniActions} from '../../../../store/prenotazioni/prenotazioni.action'
import {useDispatch} from 'react-redux';
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
let timeout:any;
let renderCount = 0;
const PrenotazioniFilters = () => {
    const [utenteFilter, setUtenteFilter] = useState<UtenteFilter>(UtenteFilter.COGNOME)
    const [dateFilter, setDateFilter] = useState<[moment.Moment,moment.Moment] | null>()
    const [searchFilter, setSearchFilter] = useState<string>('');

    const dispatch = useDispatch();
    useEffect(() => {
        timeout = setTimeout(() => {
            if(!searchFilter && !dateFilter) {
                if(renderCount !== 0) {
                    dispatch(prenotazioniActions.fetchPrenotazioni(1)) //todo edit hotel id
                }
            } else {
                dispatch(prenotazioniActions.fetchFilteredPrenotazioni({
                    nomeCliente: utenteFilter === UtenteFilter.NOME ? searchFilter : '',
                    cognomeCliente: utenteFilter !== UtenteFilter.NOME ? searchFilter : '',
                    dataInizio: dateFilter ? ''+dateFilter[0].toISOString() : '',
                    dataFine: dateFilter ? ''+dateFilter[1].toISOString() : '',
                    idHotel: 1 // todo add hotel id
                }));
                renderCount ++;
            }
        }, 500)
    }, [searchFilter, dateFilter, utenteFilter])

    useEffect(() => {
        return () => {
            renderCount = 0;
        }
    }, [])
    return (
        <div className={`${componentClassName}`}>
            <Input
                className={`${componentClassName}__input`}
                type={'text'}
                value={searchFilter}
                onChange={(e) => {
                    const {value} = e.target
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    setSearchFilter(value)
                }}/>
            <Select
                className={`${componentClassName}__select`}
                defaultValue={UtenteFilter.COGNOME}
                value={utenteFilter} style={{ width: 120 }}
                onChange={setUtenteFilter}>
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