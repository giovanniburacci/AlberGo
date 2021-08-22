import React, {ReactNode} from 'react';
import {ContactsOutlined, ControlOutlined, HomeOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import './menuContainer.scss'
import MenuItem from 'antd/es/menu/MenuItem';

interface Option {
    key: number,
    title: String,
    icon: ReactNode
}

const componentClassName = 'MenuContainer'
const menuOptions: Option[] = [{
    key: 1,
    title: 'Prenotazioni',
    icon: <ContactsOutlined />
    },
    {
        key: 2,
        title: 'Stanze',
        icon: <HomeOutlined />
    },
    {
        key: 3,
        title: 'Categorie',
        icon: <ControlOutlined />
    },
    {
        key: 4,
        title: 'Clienti',
        icon: <UsergroupAddOutlined />
    }]

export const MenuContainer = () => {

    return (
        <div className={`${componentClassName}`}>
            {
                menuOptions.map( (option,index) => {
                    return (
                        <MenuItem
                            eventKey={String(index)}
                            onClick={() => {console.log('hey')}}
                            icon={option.icon}>

                            {option.title}
                        </MenuItem>
                    )
                })
            }
        </div>
    )
}

export default MenuContainer;