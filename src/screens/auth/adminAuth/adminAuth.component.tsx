import React, {useEffect, useState} from 'react';
import {Button, Input, Typography, Modal, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './adminAuth.scss'
import {useDispatch, useSelector} from 'react-redux';
import loginActions from '../../../store/auth/auth.action';
import {authSelector} from '../../../store/auth/auth.selector';
import AdminSignUp from './adminSignUp/adminSignUp.component';
import {ArgsProps} from 'antd/es/message';
const {Text} = Typography;
const componentClassName = 'AdminAuth'

export const AdminAuth = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isLoadingLogin = useSelector(authSelector.getIsLoadingAdminLogin)
    const isErrorLogin = useSelector(authSelector.getIsErrorAdminLogin)

    useEffect(() => {
        if(isErrorLogin && hasClickedOnConfirm) {
            message.error({
                duration: 3,
                key: 'error',
                content: 'Credenziali errate!'
            } as ArgsProps);
        }
    }, [isLoadingLogin, isErrorLogin])
    return (
        <>
            <div className={`${componentClassName}`}>
                <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !username) ? 'error-input' : ''}`}>
                    <Text>Username</Text>
                    <Input size="large"
                           placeholder="Username"
                           prefix={<UserOutlined />}
                           value={username}
                           onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !password) ? 'error-input' : ''}`}>
                    <Text>Password</Text>
                    <Input type={'password'}
                           size="large"
                           placeholder="Password"
                           prefix={<LockOutlined />}
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           onPressEnter={() => null}
                    />
                </div>
                <div className={`${componentClassName}__dialog`}>
                    <div>
                        <Button type="primary" loading={false} onClick={() => setIsSigningUp(true)}>
                            Registrati
                        </Button>
                        <div>
                            <Text type={'secondary'}>Non hai un account?</Text>
                        </div>
                    </div>
                    <Button type="primary" loading={isLoadingLogin} onClick={() => {
                        setHasClickedOnConfirm(true);
                        if(username && password) {
                            dispatch(loginActions.adminLoginRequest({username, password}));
                        }
                    }}>
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