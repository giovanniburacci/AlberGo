import React, {useEffect, useState} from 'react';
import {Input, Select} from 'antd';
import './clientiFilters.scss'
import {useDispatch} from 'react-redux';
import clientiActions from '../../../store/clienti/clienti.action';

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
const componentClassName = 'ClientiFilters'
const {Option} = Select;

let timeout:any;
let renderCount = 0;
const ClientiFilters = () => {

    const [utenteFilter, setUtenteFilter] = useState<UtenteFilter>(UtenteFilter.COGNOME)
    const [searchValue, setSearchValue] = useState<string>('');

    const dispatch = useDispatch();
    useEffect(() => {
        timeout = setTimeout(() => {
            if (!searchValue) {
                if (renderCount !== 0) {
                    dispatch(clientiActions.fetchClienti(1)) // todo edit hotel id
                }
            } else {
                dispatch(clientiActions.fetchFilteredClienti({
                    nome: utenteFilter === UtenteFilter.NOME ? searchValue : '',
                    cognome: utenteFilter === UtenteFilter.COGNOME ? searchValue : '',
                    idHotel: 1 // todo fix hotel id
                }))
                renderCount++;
            }
        }, 500)
    }, [searchValue])

    useEffect(() => {
        return () => {
            renderCount = 0;
        }
    }, [])
    return (
        <div className={`${componentClassName}`}>
            <Input
                placeholder={utenteFilter.charAt(0).toUpperCase() + utenteFilter.slice(1)} className={`${componentClassName}__input`}
                value={searchValue}
                onChange={(e) => {
                    const {value} = e.target
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    setSearchValue(value)
                }}/>
            <Select className={`${componentClassName}__select`} defaultValue={UtenteFilter.COGNOME} value={utenteFilter} style={{ width: 120 }} onChange={setUtenteFilter}>
                {
                    filterOptions.map((option) => <Option value={option.value}>{option.label}</Option>)
                }
            </Select>
        </div>
    )
};

export default ClientiFilters;