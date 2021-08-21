import React from 'react';
import logo from './logo.svg';
import {Switch, Route, Router} from 'react-router-dom'
import {Button, Layout, Menu} from 'antd';
import './App.css';

function App() {
    const { Header, Content, Footer, Sider } = Layout;

    return (
        <Switch>
            <Route path='/login'>
                LOGIN
                {/* login page */}
            </Route>
            <Layout style={{ minHeight: '100vh' }}> {/* layout di antd da studiare */}
            <Sider>
                <Menu theme='dark'>

                </Menu>
            </Sider>
                <Switch>
                    <Route path='/' exact>
                        Prenotazioni
                    </Route>
                    <Route path='/stanze'>
                        Stanze
                    </Route>
                </Switch>
            </Layout>
        </Switch>
    );
}

export default App;
