import React, {useEffect, useState} from 'react';
import {Typography, Card, Input, Button, Skeleton} from 'antd'
import {LockOutlined, UserOutlined } from '@ant-design/icons';
import landing from '../../assets/landing.jpg'
import polimi from '../../assets/polimi.png'
import './login.scss'
import {useDispatch, useSelector} from 'react-redux';
import loginActions from '../../store/login/login.action';
import {loginSelector} from '../../store/login/login.selector';

interface LoginData {
    username: string,
    password: string
}

const componentClassName = 'login'
export const Login = () => {

    const {Text, Title} = Typography;
    const [isLogging,setIsLogging] = useState<boolean>(true);
    const [isShowingSkeleton, setIsShowingSkeleton] = useState<boolean>(false);
    const [loginData,setLoginData] = useState<LoginData>({
        username: '',
        password: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        setIsShowingSkeleton(true);
        setTimeout(() => {
            setIsShowingSkeleton(false);
        }, 2000)
    }, [isLogging]);

    const login = () => {
        dispatch(loginActions.loginRequest(loginData));
    }

    const isLoadingLogin = useSelector(loginSelector.getIsLoading)

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__col flex_col`}>
                <Title level={1}>AlberGO.</Title>
                <Text type={'secondary'}>L'app gestionale per la tua struttura alberghiera</Text>
                <img src={landing} width={500}  alt={'ERROR'}/>
                <div className={`${componentClassName}__col__box`}>
                    <img src={polimi} width={150} alt={'ERROR'}/>
                    <div className={`${componentClassName}__col__box__txt`}>
                        <Text type={'secondary'}>Sviluppato da Giovanni Buracci ed Ignazio Piccichè come progetto
                            di Ingegneria del Software, 2021/2022.
                        </Text>
                    </div>
                </div>
            </div>
            <div className={`${componentClassName}__col flex_col bg_login`}>
                <Card className={`${componentClassName}__col__card`} bordered={true}>
                    {isShowingSkeleton ? (
                        <Skeleton active />
                    ) : isLogging ? (
                            <>
                                <Title level={2}>Login</Title>
                                <Text>Username</Text>
                                <Input className={`${componentClassName}__col__card__input`}
                                       size="large"
                                       placeholder="Username"
                                       prefix={<UserOutlined />}
                                       value={loginData.username}
                                       onChange={(event) => {setLoginData({...loginData, username: event.target.value})}}
                                        />
                                <Text>Password</Text>
                                <Input className={`${componentClassName}__col__card__input`}
                                       type={'password'}
                                       size="large"
                                       placeholder="Password"
                                       prefix={<LockOutlined />}
                                       value={loginData.password}
                                       onChange={(event) => {
                                           setLoginData({
                                               ...loginData,
                                               password: event.target.value
                                           })
                                       }}
                                       onPressEnter={login}
                                />
                                <div className={`${componentClassName}__col__card__dialog`}>
                                    <div>
                                        <Button type="primary" loading={false} onClick={() => {setIsLogging(false)}}>
                                            Registrati
                                        </Button>
                                        <div>
                                            <Text type={'secondary'}>Non hai un account?</Text>
                                        </div>
                                    </div>
                                    <Button type="primary" loading={isLoadingLogin} onClick={login}>
                                        Login
                                    </Button>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <Title level={2}>Registrati</Title>
                                <Text>Username</Text>
                                <Input className={`${componentClassName}__col__card__input`} size="large" placeholder="Username" prefix={<UserOutlined />} />
                                <Text>Password</Text>
                                <Input className={`${componentClassName}__col__card__input`} type={'password'} size="large" placeholder="Password" prefix={<LockOutlined />} />
                                <div className={`${componentClassName}__col__card__dialog`}>
                                    <div>
                                        <Button type="primary" onClick={() => {setIsLogging(true)}}>
                                            Login
                                        </Button>
                                        <div>
                                            <Text type={'secondary'}>Hai già un account?</Text>
                                        </div>
                                    </div>
                                    <Button type="primary">
                                        Registrati
                                    </Button>
                                </div>
                            </>
                        )}

                </Card>
            </div>
        </div>
        )
}

export default Login;