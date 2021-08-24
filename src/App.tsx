import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom'
import {Drawer, Layout, Menu} from 'antd';
import { Login } from './screens/login/login';
import './App.scss'
import { MenuContainer } from './containers/menuContainer/menuContainer';
import {useHistory } from 'react-router-dom'
import HeaderContainer from './containers/headerContainer/headerContainer';

const componentClassName = 'App';
function App() {
    const { Header, Content, Sider } = Layout;
    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [hasLogged,setHasLogged] = useState<boolean>(!!localStorage.getItem('logged'));
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const history = useHistory();
    return (
        <div className={`${componentClassName}`}>
            { !hasLogged && (
                <Switch>
                    <Route path='/login'>
                        <Login hasLogged={hasLogged} setHasLogged={(value) => {setHasLogged(value)}}/>
                    </Route>
                </Switch>
            )}
            {
                hasLogged ? (
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider theme={'dark'} collapsible trigger={null} collapsed={isCollapsed}>
                            <Menu theme={'dark'} defaultSelectedKeys={['0']}>
                                <MenuContainer isCollapsed={isCollapsed}/>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header className={`${componentClassName}__header`}>
                                <HeaderContainer
                                    isCollapsed={isCollapsed}
                                    setCollapsed={(value) => {setIsCollapsed(value)}}/>
                            </Header>
                            <Content>
                                <Switch>
                                    <Route path='/' exact>
                                        Prenotazioni
                                    </Route>
                                    <Route path='/stanze'>
                                        Stanze
                                    </Route>
                                    <Route path='/*'>
                                        <>
                                            {history.replace('/')}
                                        </>
                                    </Route>
                                </Switch>
                                <Drawer visible={isDrawerVisible} onClose={() => {
                                    setIsDrawerVisible(false)
                                }}>
                                    <p>Prova drawer</p>
                                </Drawer>
                            </Content>
                        </Layout>
                    </Layout>
                ) : (
                    <Route path='/*'>
                        <>
                            {history.replace('/login')}
                        </>
                    </Route>
                )
            }
        </div>
    );
}

export default App;