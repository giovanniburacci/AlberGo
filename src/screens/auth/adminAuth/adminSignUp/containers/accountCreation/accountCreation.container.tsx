import React, {useState} from 'react';
import OnlyAccount from '../../tabs/onlyAccount/onlyAccount.component';
import {AdminCreation} from '../../../types';
import {Button} from 'antd'

export const AccountCreation = () => {

    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();

    return (
        <>
            <OnlyAccount isCreatingHotel={false} newAdmin={newAdmin} setNewAdmin={(item,value) => {setNewAdmin(prevState => ({...prevState, [item]: value}))}}/>
            <Button
                style={{float: 'right'}}
                type={'primary'}
                onClick={() => null}>
                Registrati
            </Button>
        </>
    )
}

export default AccountCreation;