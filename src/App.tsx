import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Drawer, Layout, Menu} from 'antd';
import { Login } from './screens/login/login';
import './App.scss'
import { MenuContainer } from './containers/menuContainer/menuContainer';
import HeaderContainer from './containers/headerContainer/headerContainer';
import {useSelector} from 'react-redux';
import {loginSelector} from './store/login/login.selector';

const componentClassName = 'App';
function App() {
    const { Header, Content, Sider } = Layout;
    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>();
    const token = useSelector(loginSelector.getToken);

    return (
        <div className={`${componentClassName}`}>
            { !token ? (
                <Switch>
                    <Route path='/*'>
                        <Login />
                    </Route>
                </Switch>
            ) : (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        theme={'dark'}
                        collapsible
                        trigger={null}
                        collapsed={isCollapsed}>
                        <Menu theme={'dark'}
                              defaultSelectedKeys={['0']}
                              className={`${componentClassName}__menu`}>
                            <MenuContainer isCollapsed={isCollapsed}/>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className={`${componentClassName}__header`}>
                            <HeaderContainer
                                isCollapsed={isCollapsed}
                                setCollapsed={(value) => {setIsCollapsed(value)}}/>
                        </Header>
                        <Content className={`${componentClassName}__content`}>
                            <div className={`${componentClassName}__content__box`}>
                                <Switch>
                                    <Route path='/' exact>
                                        Prenotazioni
                                    </Route>
                                    <Route path='/stanze'>
                                        Stanze
                                    </Route>
                                    <Route path='/*'>
                                        <Redirect to='/' />
                                    </Route>
                                </Switch>
                            </div>
                            <Drawer visible={isDrawerVisible} onClose={() => {
                                setIsDrawerVisible(false)
                            }}>
                                <p>Prova drawer</p>
                            </Drawer>
                        </Content>
                    </Layout>
                </Layout>
            )
            }
        </div>
    );
}

export default App;