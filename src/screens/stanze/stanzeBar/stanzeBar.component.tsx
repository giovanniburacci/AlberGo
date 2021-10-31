import React from 'react';
import './stanzeBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import StanzeFilters from './stanzeFilters/stanzeFilters.component';
import moment from 'moment';
const componentClassName = 'StanzeBar'

interface StanzeBarProps {
    setHasClickedNew: () => void
    dateFilter?: [moment.Moment, moment.Moment] | null,
    setDateFilter: (dates:[moment.Moment, moment.Moment] | null | undefined) => void
}
const StanzeBar = (props:StanzeBarProps) => {
    const {setHasClickedNew, dateFilter, setDateFilter} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <StanzeFilters
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}/>
            </div>
            <div className={`${componentClassName}__box`}>
                <Button type={'primary'} onClick={setHasClickedNew} icon={<PlusCircleOutlined />}>
                    Nuova
                </Button>
            </div>
        </div>
    )
}

export default StanzeBar;