import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Layout, Menu} from 'antd';
import { AuthComponent } from './screens/auth/auth.component';
import './App.scss'
import { MenuContainer } from './containers/menuContainer/menuContainer.container';
import HeaderContainer from './containers/headerContainer/headerContainer.container';
import {useSelector} from 'react-redux';
import {loginSelector} from './store/login/login.selector';
import Prenotazioni from './screens/prenotazioni/prenotazioni.component';
import Stanze from './screens/stanze/stanze.component';
import Categorie from './screens/categorie/categorie.component';
import Clienti from './screens/clienti/clienti.component';
import Hotel from './screens/hotel/hotel.component';
import Hotels from './screens/userScreens/hotels/hotels.component';
import 'react-credit-cards/lib/styles.scss';
import CardDetail from './screens/userScreens/cardDetail/cardDetail.component';
const componentClassName = 'App';

const screens = ['Prenotazioni', 'Stanze', 'Categorie', 'Clienti']

const getCurrentSection = () => {
    const currentURL = window.location.pathname;
    const currentScreen =  ''+screens.findIndex(screen => screen.toLocaleLowerCase() === currentURL.substring(1))
    if(currentScreen === '-1') {
        return '0';
    } else {
        return currentScreen;
    }
}

function App() {
    const { Header, Content, Sider } = Layout;
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [selectedKey,setSelectedKey] = useState<string>(getCurrentSection());
    const token = useSelector(loginSelector.getToken);
    const amministratore = useSelector(loginSelector.getAmministratore);
    const user = useSelector(loginSelector.getUser);

    return (
        <div className={`${componentClassName}`}>
            { !token ? (
                <Switch>
                    <Route path='/*'>
                        <AuthComponent />
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
                              defaultSelectedKeys={[selectedKey]}
                              className={`${componentClassName}__menu`}
                              selectedKeys={[selectedKey]}
                              onSelect={(key) => {setSelectedKey(key.key)}}
                        >
                            <MenuContainer isAdmin={!!amministratore} isCollapsed={isCollapsed}/>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className={`${componentClassName}__header`}>
                            <HeaderContainer
                                isAdmin={!!amministratore}
                                isCollapsed={isCollapsed}
                                setCollapsed={(value) => {setIsCollapsed(value)}}
                                selectedKey={selectedKey}/>
                        </Header>
                        <Content className={`${componentClassName}__content`}>
                            <div className={`${componentClassName}__content__box`}>
                                {
                                    amministratore ? (
                                        <Switch>
                                            <Route path='/' exact>
                                                <Prenotazioni />
                                            </Route>
                                            <Route path='/stanze'>
                                                <Stanze />
                                            </Route>
                                            <Route path='/categorie'>
                                                <Categorie />
                                            </Route>
                                            <Route path='/clienti'>
                                                <Clienti />
                                            </Route>
                                            <Route path='/hotel'>
                                                <Hotel />
                                            </Route>
                                            <Route path='/*'>
                                                <Redirect to='/' />
                                            </Route>
                                        </Switch>
                                    ) : user && (
                                        <Switch>
                                            <Route path={'/'} exact>
                                                <Hotels />
                                            </Route>
                                            <Route path={'/fatture'} exact>
                                                <Prenotazioni />
                                            </Route>
                                            <Route path={'/card'} exact>
                                                <CardDetail />
                                            </Route>
                                            <Route path='/*'>
                                                <Redirect to='/' />
                                            </Route>
                                        </Switch>
                                    )
                                }
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )
            }
        </div>
    );
}

export default App;