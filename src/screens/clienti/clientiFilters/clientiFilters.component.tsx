import React, {useState} from 'react';
import {Input, Select} from 'antd';
import './clientiFilters.scss'


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
const ClientiFilters = () => {

    const [utenteFilter, setUtenteFilter] = useState<UtenteFilter>(UtenteFilter.COGNOME)

    return (
        <div className={`${componentClassName}`}>
            <Input placeholder={utenteFilter.charAt(0).toUpperCase() + utenteFilter.slice(1)} className={`${componentClassName}__input`}/>
            <Select className={`${componentClassName}__select`} defaultValue={UtenteFilter.COGNOME} value={utenteFilter} style={{ width: 120 }} onChange={setUtenteFilter}>
                {
                    filterOptions.map((option) => <Option value={option.value}>{option.label}</Option>)
                }
            </Select>
        </div>
    )
};

export default ClientiFilters;