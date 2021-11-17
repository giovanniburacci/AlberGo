import React, {useState} from 'react';
import {Button, Input, Typography, Modal} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './userAuth.scss'
import loginActions from '../../../store/login/login.action'
import {useDispatch} from 'react-redux';
const {Text} = Typography;
const componentClassName = 'UserAuth'

export const UserAuth = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    const dispatch = useDispatch();
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
                    <Button type="primary" onClick={() => {dispatch(loginActions.userLoginRequest({username, password}))}}>
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
            </Modal>
        </>
    )
}

export default UserAuth;