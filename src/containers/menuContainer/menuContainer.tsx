import React, {ReactNode} from 'react';
import {ContactsOutlined, ControlOutlined, HomeOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import './menuContainer.scss'
import MenuItem from 'antd/es/menu/MenuItem';

interface Option {
    key: number,
    title: String,
    icon: ReactNode
}

const componentClassName = 'MenuContainer'

interface MenuContainerProps {
    isCollapsed: boolean
}

export const MenuContainer = (props:MenuContainerProps) => {
    const {isCollapsed} = props;

    const menuOptions: Option[] = [{
        key: 1,
        title: 'Prenotazioni',
        icon: <ContactsOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
    },
        {
            key: 2,
            title: 'Stanze',
            icon: <HomeOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        },
        {
            key: 3,
            title: 'Categorie',
            icon: <ControlOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        },
        {
            key: 4,
            title: 'Clienti',
            icon: <UsergroupAddOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        }];

    return (
        <div className={`${componentClassName}`}>
            {
                menuOptions.map( (option,index) => {
                    return (
                        <>
                            <MenuItem
                                style={isCollapsed ? {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                } : undefined }
                                eventKey={String(index)}
                                onClick={() => {console.log('hey')}}
                                icon={option.icon}>
                                {
                                    !isCollapsed && option.title
                                }
                            </MenuItem>
                        </>
                    )
                })
            }
        </div>
    )
}

export default MenuContainer;