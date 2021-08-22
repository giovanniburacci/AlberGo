import React, {ReactNode, useState} from 'react';
import {Switch, Route} from 'react-router-dom'
import {Drawer, Layout, Menu} from 'antd';
import './App.css';
import { Login } from './screens/login/login';
import { MenuContainer } from './containers/menuContainer/menuContainer';

function App() {
    const { Header, Content, Sider } = Layout;
    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false)
    return (
        <>
            <Switch>
                <Route path='/login'>
                    <Login/>
                </Route>
            </Switch>
            <Layout style={{ minHeight: '100vh' }}>
                <Header color={'red'}>
                    <div>
                        <h2 style={{color: 'white'}}>
                            AlberGO.
                        </h2>
                    </div>
                </Header>
                <Layout>
                    <Sider theme='light' collapsible={true}>
                        <Menu multiple={false}>
                            <MenuContainer/>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content>
                            <Switch>
                                <Route path='/' exact>
                                    Prenotazioni
                                </Route>
                                <Route path='/stanze'>
                                    Stanze
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
            </Layout>
        </>
    );
}

export default App;
