import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom'
import {Drawer, Layout, Menu} from 'antd';
import { Login } from './screens/login/login';
import './App.scss'
import { MenuContainer } from './containers/menuContainer/menuContainer';
import {useHistory } from 'react-router-dom'
function App() {
    const { Header, Content, Sider } = Layout;
    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [hasLogged,setHasLogged] = useState<boolean>(!!localStorage.getItem('logged'));
    const history = useHistory();
    return (
        <>
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
                        <Sider theme={'dark'} collapsible trigger={null}>
                            <Menu theme={'dark'}>
                                <MenuContainer/>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header>
                                <div>
                                    <h2 style={{color: 'white'}}>
                                        AlberGO.
                                    </h2>
                                </div>
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
        </>
    );
}

export default App;