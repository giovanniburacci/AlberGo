import React from 'react';
import './stanzeBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
const componentClassName = 'StanzeBar'

interface StanzeBarProps {
    setHasClickedNew: () => void
}
const StanzeBar = (props:StanzeBarProps) => {
    const {setHasClickedNew} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <Input type={'text'}/>
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