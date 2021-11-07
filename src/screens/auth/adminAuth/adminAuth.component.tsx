import React, {useState} from 'react';
import {Button, Input, Typography, Modal} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './adminAuth.scss'
import {useDispatch, useSelector} from 'react-redux';
import loginActions from '../../../store/login/login.action';
import {loginSelector} from '../../../store/login/login.selector';
import AdminSignUp from './adminSignUp/adminSignUp.component';
const {Text} = Typography;
const componentClassName = 'AdminAuth'

export const AdminAuth = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isLoadingLogin = useSelector(loginSelector.getIsLoading)

    return (
        <>
            <div className={`${componentClassName}`}>
                <Text>Username</Text>
                <Input className={`${componentClassName}__input`}
                       size="large"
                       placeholder="Username"
                       prefix={<UserOutlined />}
                       value={username}
                       onChange={(event) => setUsername(event.target.value)}
                />
                <Text>Password</Text>
                <Input className={`${componentClassName}__input`}
                       type={'password'}
                       size="large"
                       placeholder="Password"
                       prefix={<LockOutlined />}
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}
                       onPressEnter={() => null}
                />
                <div className={`${componentClassName}__dialog`}>
                    <div>
                        <Button type="primary" loading={false} onClick={() => setIsSigningUp(true)}>
                            Registrati
                        </Button>
                        <div>
                            <Text type={'secondary'}>Non hai un account?</Text>
                        </div>
                    </div>
                    <Button type="primary" loading={isLoadingLogin} onClick={() => {dispatch(loginActions.adminLoginRequest({username, password}))}}>
                        Login
                    </Button>
                </div>
            </div>

            <Modal centered
                   visible={isSigningUp}
                   footer={null}
                   destroyOnClose={true}
                   maskClosable={true}
                   onCancel={() => setIsSigningUp(false)}>
                <AdminSignUp/>
            </Modal>
        </>
    )
}

export default AdminAuth;