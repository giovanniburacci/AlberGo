import React from 'react';
import logo from './logo.svg';
import {Switch, Route, Router, useHistory} from 'react-router-dom'
import {Button, Layout, Menu} from 'antd';
import './App.css';
import {useDispatch} from 'react-redux';
import {testActionRequest} from './store/test/test.action';

function App() {
    const { Header, Content, Footer, Sider } = Layout;
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route path='/login'>
                LOGIN
                {/* login page */}
            </Route>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider theme='dark'>
                    <div>
                        <h2 style={{color: 'white', height: '64px'}}>
                            AlberGO.
                        </h2>
                    </div>
                    <Menu>
                        <Menu.Item>
                            <button onClick={() => {history.replace('/')}}>
                                Prenotazioni
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={() => {history.replace('/stanze')}}>
                                Stanze
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={() => {dispatch(testActionRequest())}}>
                                Cambia
                            </button>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header color={'red'}>

                    </Header>
                    <Content>
                        <Switch>
                            <Route path='/' exact>
                                Prenotazioni
                            </Route>
                            <Route path='/stanze'>
                                Stanze
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Switch>
    );
}

export default App;
