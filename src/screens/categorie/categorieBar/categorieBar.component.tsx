import React from 'react';
import './categorieBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
const componentClassName = 'CategorieBar'

interface CategorieBarProps {
    setHasClickedNew: () => void
}
const CategorieBar = (props:CategorieBarProps) => {
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

export default CategorieBar;