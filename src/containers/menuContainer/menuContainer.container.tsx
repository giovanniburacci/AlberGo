import React, {ReactNode} from 'react';
import {ContactsOutlined, ControlOutlined, HomeOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import './menuContainer.scss'
import MenuItem from 'antd/es/menu/MenuItem';
import {Tag} from 'antd';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import categorieSelector from '../../store/categorie/categorie.selector';
import stanzeSelector from '../../store/stanze/stanze.selector';

interface Option {
    title: String,
    icon: ReactNode,
    path: string
}

const componentClassName = 'MenuContainer'

interface MenuContainerProps {
    isCollapsed: boolean
}

export const MenuContainer = (props:MenuContainerProps) => {
    const {isCollapsed} = props;
    const history = useHistory();
    const menuOptions: Option[] = [{
        title: 'Prenotazioni',
        icon: <ContactsOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
        path: '/'
    },
        {
            title: 'Stanze',
            icon: <HomeOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/stanze'
        },
        {
            title: 'Categorie',
            icon: <ControlOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/categorie'
        },
        {
            title: 'Clienti',
            icon: <UsergroupAddOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/clienti'
        }];

    //todo ignazio mi serve il count
    const categorie = useSelector(categorieSelector.getCategorie);
    const stanze = useSelector(stanzeSelector.getStanze)

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
                                    icon={option.icon}
                                    onClick={() => {history.push(option.path)}}
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
                             style={{backgroundImage: 'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag green` : `${componentClassName}__badges__tag__collapsed green`}>
                            {stanze && stanze.length} {!isCollapsed && <>Stanze totali</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{backgroundImage: 'linear-gradient( 135deg, #F05F57 10%, #360940 100%)',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>
                            X {!isCollapsed && <>Stanze occupate</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{backgroundImage: 'linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)',
                                     color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>
                            {categorie && categorie.length} {!isCollapsed && <>Categorie</>}
                        </Tag>
                        <Tag color={'default'}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}
                             style={{backgroundImage: 'linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%)',
                                     color: '#ffffff'}}>
                            X {!isCollapsed && <>Clienti registrati</>}
                        </Tag>
                    </div>
        </div>
    )
}

export default MenuContainer;