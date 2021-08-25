import React, {ReactNode} from 'react';
import {ContactsOutlined, ControlOutlined, HomeOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import './menuContainer.scss'
import MenuItem from 'antd/es/menu/MenuItem';
import {Tag} from 'antd';

interface Option {
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
        title: 'Prenotazioni',
        icon: <ContactsOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
    },
        {
            title: 'Stanze',
            icon: <HomeOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        },
        {
            title: 'Categorie',
            icon: <ControlOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        },
        {
            title: 'Clienti',
            icon: <UsergroupAddOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>
        }];

    return (
        <div className={`${componentClassName}`}>
            <div>
                {
                    menuOptions.map( (option,index) => {
                        return (
                                <MenuItem
                                    style={isCollapsed ? {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    } : undefined }
                                    eventKey={String(index)}
                                    onClick={() => {console.log('hey')}}
                                    icon={option.icon}
                                    key={index}>
                                    {
                                        !isCollapsed && option.title
                                    }
                                </MenuItem>
                        )
                    })
                }
            </div>
                    <div className={`${componentClassName}__badges`}>
                        <Tag color={'default'}
                             style={{background: '#7bc74c',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>
                            X {!isCollapsed && <>Stanze totali</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{background: '#BE0000',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>
                            X {!isCollapsed && <>Stanze occupate</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{background: '#E48900',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>
                            X {!isCollapsed && <>Categorie</>}
                        </Tag>
                        <Tag color={'default'}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}
                             style={{background: '#7e1dbb',
                                     color: '#ffffff'}}>
                            X {!isCollapsed && <>Clienti registrati</>}
                        </Tag>
                    </div>
        </div>
    )
}

export default MenuContainer;