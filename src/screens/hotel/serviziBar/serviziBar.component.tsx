import React from 'react';
import './serviziBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
const componentClassName = 'ServiziBar'

interface ServiziBarProps {
    setHasClickedNew: () => void
}
const ServiziBar = (props:ServiziBarProps) => {
    const {setHasClickedNew} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <Button type={'primary'} onClick={setHasClickedNew} icon={<PlusCircleOutlined />}>
                    Nuovo servizio
                </Button>
            </div>
        </div>
    )
}

export default ServiziBar;