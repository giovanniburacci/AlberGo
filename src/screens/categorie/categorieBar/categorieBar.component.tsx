import React, {useEffect, useState} from 'react';
import './categorieBar.scss'
import {Button, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import categorieActions from '../../../store/categorie/categorie.action';
import {useDispatch, useSelector} from 'react-redux';
const componentClassName = 'CategorieBar'

interface CategorieBarProps {
    setHasClickedNew: () => void
}
let timeout:any;
let renderCount = 0;
const CategorieBar = (props:CategorieBarProps) => {
    const {setHasClickedNew} = props;

    const [searchCategoria, setSearchCategoria] = useState<string>();
    const dispatch = useDispatch();
    useEffect(() => {
        timeout = setTimeout(() => {
            if(!searchCategoria) {
                if(renderCount !== 0) {
                    dispatch(categorieActions.fetchCategorie(1)) //todo edit hotel id
                }
            } else {
                dispatch(categorieActions.fetchFilteredCategorie({
                        idHotel: 1, // todo fix hotel id
                        nome: searchCategoria
                    }
                ))
                renderCount ++;
            }
        }, 500)
    }, [searchCategoria])

    useEffect(() => {
        return () => {
            renderCount = 0;
        }
    }, [])
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__box`}>
                <Input type={'text'}
                       placeholder={'Nome categoria...'}
                       value={searchCategoria}
                       onChange={(e) => {
                           const {value} = e.target
                           if (timeout) {
                               clearTimeout(timeout);
                           }
                           setSearchCategoria(value)
                       }}/>
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