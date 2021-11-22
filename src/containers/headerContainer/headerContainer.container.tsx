import React from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons';
import loginActions from '../../store/login/login.action'
import './headerContainer.scss'
import {Button, Typography} from 'antd';
import {useDispatch} from 'react-redux';
const componentClassName = 'HeaderContainer'

interface HeaderContainerProps {
    setCollapsed: (value:boolean) => void,
    isCollapsed: boolean,
    selectedKey: string,
    isAdmin: boolean
}

export const HeaderContainer = (props:HeaderContainerProps) => {
    const {Title} = Typography;
    const {setCollapsed, isCollapsed,selectedKey, isAdmin } = props;
    const screens = isAdmin ? ['Prenotazioni', 'Stanze', 'Categorie', 'Clienti', 'Hotel'] : ['Hotels', 'Fatture']

    const dispatch = useDispatch();

    return (
        <div className={`${componentClassName}`}>
            <>
                {
                    isCollapsed ? (
                        <MenuUnfoldOutlined style={{fontSize: '32px'}} onClick={() => {setCollapsed(false)}}/>
                    ) : (
                        <MenuFoldOutlined style={{fontSize: '32px'}} onClick={() => {setCollapsed(true)}}/>
                    )
                }
                <Title level={2} style={{margin: '0'}}>
                    {screens[Number(selectedKey)]}
                </Title>
            </>
            <Button type="primary"
                    icon={<LogoutOutlined />}
                    size={'large'}
                    onClick={() => {dispatch(loginActions.adminLogoutAction())}}>Esci</Button>
        </div>
    )
}

export default HeaderContainer;
