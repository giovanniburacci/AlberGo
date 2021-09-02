import React from 'react';
import './prenotazioniBar.scss'
import {Button, Input} from 'antd';
const componentClassName = 'PrenotazioniBar'

interface PrenotazioniBarProps {
    setHasClickedNew: () => void
}
const PrenotazioniBar = (props:PrenotazioniBarProps) => {
    const {setHasClickedNew} = props;
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <Input type={'text'}/>
            </div>
            <div className={`${componentClassName}__box`}>
                <Button type={'primary'} onClick={setHasClickedNew}>
                    Nuova
                </Button>
            </div>
        </div>
    )
}

export default PrenotazioniBar;