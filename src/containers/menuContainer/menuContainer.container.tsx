import React, {ReactNode, useEffect} from 'react';
import {
    ContactsOutlined,
    ControlOutlined,
    HomeOutlined,
    UserOutlined,
    ShopOutlined,
    ContainerOutlined, CreditCardOutlined
} from '@ant-design/icons';
import './menuContainer.scss'
import MenuItem from 'antd/es/menu/MenuItem';
import {Spin, Tag} from 'antd';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import categorieSelector from '../../store/categorie/categorie.selector';
import stanzeSelector from '../../store/stanze/stanze.selector';
import categorieActions from '../../store/categorie/categorie.action';
import {authSelector} from '../../store/auth/auth.selector';
import clientiSelector from '../../store/clienti/clienti.selector';
import clientiActions from '../../store/clienti/clienti.action';
import stanzeActions from '../../store/stanze/stanze.action';

interface Option {
    title: String,
    icon: ReactNode,
    path: string
}

const componentClassName = 'MenuContainer'

interface MenuContainerProps {
    isCollapsed: boolean,
    isAdmin: boolean
}

let renderCount = 0;
export const MenuContainer = (props:MenuContainerProps) => {
    const {isCollapsed, isAdmin} = props;
    const history = useHistory();
    const menuOptions: Option[] = isAdmin ?
        [{
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
            icon: <UserOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/clienti'
        },
        {
            title: 'Hotel',
            icon: <ShopOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/hotel'
        }] : [
        {
            title: 'Hotels',
            icon: <ShopOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/'
        },
        {
            title: 'Fatture',
            icon: <ContainerOutlined style={{fontSize: isCollapsed ? '32px' : 'unset'}}/>,
            path: '/fatture'
        }
    ];
    const dispatch = useDispatch();

    const categorie = useSelector(categorieSelector.getCategorie);
    const stanze = useSelector(stanzeSelector.getStanze)
    const hotelId = useSelector(authSelector.getIdHotel)
    const clienti = useSelector(clientiSelector.getClienti)

    const isLoadingClienti = useSelector(clientiSelector.getIsLoading);
    const isLoadingStanze = useSelector(stanzeSelector.getIsLoading);
    const isLoadingCategorie = useSelector(categorieSelector.getIsLoading);

    const isLoading = isLoadingStanze || isLoadingClienti || isLoadingCategorie;

    useEffect(() => {
        if(renderCount === 0) {
            if(hotelId && isAdmin) {
                dispatch(categorieActions.fetchCategorie(hotelId));
                dispatch(clientiActions.fetchClienti(hotelId))
                dispatch(stanzeActions.fetchStanze(hotelId))
                renderCount ++;
            }
        }
    }, [hotelId])

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
            {
                isAdmin && (
                    <div className={`${componentClassName}__badges`}>
                        <Tag color={'default'}
                             style={{backgroundImage: 'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',
                                 color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag green` : `${componentClassName}__badges__tag__collapsed green`}>

                            {stanze ? stanze.length : isLoading ? <Spin /> : 'X'}

                            {!isCollapsed && <> Stanze totali</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{backgroundImage: 'linear-gradient( 135deg, #F05F57 10%, #360940 100%)',
                                 color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>

                            {stanze ? stanze.filter(s => s.fuoriServizio).length : isLoading ? <Spin /> : 'X'}

                            {!isCollapsed && <> Stanze fuori servizio</>}
                        </Tag>
                        <Tag color={'default'}
                             style={{backgroundImage: 'linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)',
                                 color: '#ffffff'}}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}>

                            {categorie ? categorie.length : isLoading ? <Spin /> : 'X'}

                            {!isCollapsed && <> Categorie</>}
                        </Tag>
                        <Tag color={'default'}
                             className={!isCollapsed ? `${componentClassName}__badges__tag` : `${componentClassName}__badges__tag__collapsed`}
                             style={{backgroundImage: 'linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%)',
                                 color: '#ffffff'}}>

                            {clienti ? clienti.length : isLoading ? <Spin /> : 'X'}

                            {!isCollapsed && <> Clienti registrati</>}
                        </Tag>
                    </div>
                )
            }
        </div>
    )
}

export default MenuContainer;