import React from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    CreditCardOutlined
} from '@ant-design/icons';
import loginActions from '../../store/auth/auth.action'
import './headerContainer.scss'
import {Button, Typography} from 'antd';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
const componentClassName = 'HeaderContainer'

interface HeaderContainerProps {
    setCollapsed: (value:boolean) => void,
    setIsOpeningCardDetail: () => void,
    isCollapsed: boolean,
    selectedKey: string,
    isAdmin: boolean
}

export const HeaderContainer = (props:HeaderContainerProps) => {
    const {Title} = Typography;
    const {setCollapsed, isCollapsed,selectedKey, isAdmin, setIsOpeningCardDetail} = props;
    const history = useHistory();
    const screens = isAdmin ? ['Prenotazioni', 'Stanze', 'Categorie', 'Clienti', 'Hotel'] : ['Hotels', 'Fatture']

    const dispatch = useDispatch();

    return (
        <div className={`${componentClassName}`}>
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
            <div>
                {
                    !isAdmin && (
                        <Button
                            type={'primary'}
                            size={'large'}
                            icon={<CreditCardOutlined/>}
                            style={{margin: '0 12px 0 0'}}
                            onClick={setIsOpeningCardDetail}>
                            Gestisci carta
                        </Button>
                    )
                }
                <Button type="primary"
                        icon={<LogoutOutlined />}
                        size={'large'}
                        onClick={() => {
                            if(isAdmin) {
                                dispatch(loginActions.adminLogoutAction())
                            } else {
                                dispatch(loginActions.userLogoutAction())
                            }
                            history.push('/')}}>
                    Esci
                </Button>
            </div>
        </div>
    )
}

export default HeaderContainer;
