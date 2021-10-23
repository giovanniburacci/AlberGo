import React from 'react';
import './stanzeBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import StanzeFilters from './stanzeFilters/stanzeFilters.component';
const componentClassName = 'StanzeBar'

interface StanzeBarProps {
    setHasClickedNew: () => void
}
const StanzeBar = (props:StanzeBarProps) => {
    const {setHasClickedNew} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <StanzeFilters />
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