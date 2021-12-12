import React, {useEffect, useState} from 'react';
import OnlyAccount from '../../tabs/onlyAccount/onlyAccount.component';
import {AdminCreation} from '../../../types';
import {Button, message} from 'antd'
import {useSelector} from 'react-redux';
import {authSelector} from '../../../../../../store/auth/auth.selector';
import {ArgsProps} from 'antd/es/message';

interface AccountCreationProps {
    closeModal: () => void
}
export const AccountCreation = (props: AccountCreationProps) => {

    const {closeModal} = props;
    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();
    const [hotelKey, setHotelKey] = useState<string>()
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);

    const isLoading = useSelector(authSelector.getIsLoadingRegister);
    const isError = useSelector(authSelector.getIsErrorRegister);

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando l\'account...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione dell\'account !'
            } as ArgsProps);
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Account creato con successo!'
            } as ArgsProps);
            closeModal();
        }
    }, [isLoading, isError])

    return (
        <>
            <OnlyAccount
                isCreatingHotel={false}
                newAdmin={newAdmin}
                setNewAdmin={(item,value) => {setNewAdmin(prevState => ({...prevState, [item]: value}))}}
                hotelKey={hotelKey}
                setHotelKey={setHotelKey}
                hasClickedOnConfirm={hasClickedOnConfirm}
                />
            <Button
                loading={isLoading}
                style={{float: 'right'}}
                type={'primary'}
                onClick={() => {
                    setHasClickedOnConfirm(true);
                }}>
                Registrati
            </Button>
        </>
    )
}

export default AccountCreation;