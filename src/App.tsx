import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Layout, Menu, Modal} from 'antd';
import { AuthComponent } from './screens/auth/auth.component';
import './App.scss'
import { MenuContainer } from './containers/menuContainer/menuContainer.container';
import HeaderContainer from './containers/headerContainer/headerContainer.container';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from './store/auth/auth.selector';
import Prenotazioni from './screens/prenotazioni/prenotazioni.component';
import Stanze from './screens/stanze/stanze.component';
import Categorie from './screens/categorie/categorie.component';
import Clienti from './screens/clienti/clienti.component';
import Hotel from './screens/hotel/hotel.component';
import Hotels from './screens/userScreens/hotels/hotels.component';
import 'react-credit-cards/lib/styles.scss';
import CardDetail from './screens/userScreens/cardDetail/cardDetail.component';
import loginActions from './store/auth/auth.action';
import moment from 'moment';
const componentClassName = 'App';

let adminAutoLogout: any, userAutoLogout: any;
function App() {

    const getCurrentSection = () => {
        const currentURL = window.location.pathname;
        const currentScreen =  ''+screens.findIndex(screen => screen.toLocaleLowerCase() === currentURL.substring(1))
        if(currentScreen === '-1') {
            return '0';
        } else {
            return currentScreen;
        }
    }

    const amministratore = useSelector(authSelector.getAmministratore);

    const screens = amministratore ? ['Prenotazioni', 'Stanze', 'Categorie', 'Clienti', 'Hotel'] : ['Hotels', 'Fatture']


    const { Header, Content, Sider } = Layout;
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [selectedKey,setSelectedKey] = useState<string>(getCurrentSection());
    const [isOpeningCardDetail, setIsOpeningCardDetail] = useState<boolean>(false)
    const userToken = useSelector(authSelector.getUserToken);
    const adminToken = useSelector(authSelector.getAdminToken);
    const user = useSelector(authSelector.getUser);
    const adminExpiration = useSelector(authSelector.getAdminExpiration)
    const userExpiration = useSelector(authSelector.getUserExpiration)
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedKey(getCurrentSection())
        if(amministratore && adminExpiration) {
            const newDate = moment(adminExpiration, 'ddd MMM DD HH:mm:ss');
            const expirationMillis = Date.parse(newDate.toISOString())
            const remainingTime = expirationMillis - Date.parse(new Date().toISOString())
            adminAutoLogout = setTimeout(() => {
                dispatch(loginActions.adminLogoutAction());
            }, remainingTime)
        }

        if(user && userExpiration) {
            const newDate = moment(userExpiration, 'ddd MMM DD HH:mm:ss');
            const expirationMillis = Date.parse(newDate.toISOString())
            const remainingTime = expirationMillis - Date.parse(new Date().toISOString())
            userAutoLogout = setTimeout(() => {
                dispatch(loginActions.userLogoutAction());
            }, remainingTime )
        }
        if(!amministratore) {
            clearTimeout(adminAutoLogout)
        }

        if(!user) {
            clearTimeout(userAutoLogout)
        }
    }, [amministratore, user, adminExpiration, userExpiration])

    return (
        <>
        <div className={`${componentClassName}`}>
            { ( !adminToken && !userToken) ? (
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
                                setIsOpeningCardDetail={() => setIsOpeningCardDetail(true)}
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
                                    ) : user ? (
                                        <Switch>
                                            <Route path={'/'} exact>
                                                <Hotels />
                                            </Route>
                                            <Route path={'/fatture'} exact>
                                                <Prenotazioni />
                                            </Route>
                                            <Route path='/*'>
                                                <Redirect to='/' />
                                            </Route>
                                        </Switch>
                                    ) : null
                                }
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )
            }
        </div>
        <Modal
            centered
            footer={null}
            destroyOnClose={true}
            maskClosable={true}
            visible={isOpeningCardDetail}
            onCancel={() => setIsOpeningCardDetail(false)}>
            <CardDetail />
        </Modal>
        </>
    );
}

export default App;