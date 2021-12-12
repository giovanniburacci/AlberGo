import React, {useEffect, useState} from 'react';
import OnlyAccount from '../../tabs/onlyAccount/onlyAccount.component';
import {AdminCreation} from '../../../types';
import CreateHotel from '../../tabs/createHotel/createHotel.component';
import {HotelDTO} from '../../../../../../models/models';
import {Button, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import loginActions from '../../../../../../store/auth/auth.action';
import {authSelector} from '../../../../../../store/auth/auth.selector';
import {ArgsProps} from 'antd/es/message';

interface HotelCreationProps {
    closeModal: () => void
}

export const HotelCreation = (props: HotelCreationProps) => {
    const {closeModal} = props;
    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();
    const [newHotel, setNewHotel] = useState<Partial<HotelDTO>>()
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

    const dispatch = useDispatch();
    return (
        <>
            <OnlyAccount newAdmin={newAdmin}
                         setNewAdmin={(item,value) => {setNewAdmin(prevState => ({...prevState, [item]: value}))}}
                         isCreatingHotel={true}
                         hasClickedOnConfirm={hasClickedOnConfirm}
            />
            <hr/>
            <CreateHotel newHotel={newHotel}
                         setNewHotel={(item,value) => {setNewHotel(prevState => ({...prevState, [item]: value}))}}
                         hasClickedOnConfirm={hasClickedOnConfirm}
            />
            <Button
                loading={isLoading}
                type={'primary'}
                style={{float: 'right'}}
                onClick={() => {
                    setHasClickedOnConfirm(true);
                    if(newAdmin && newHotel && newAdmin.nome && newAdmin.cognome && newAdmin.username && newAdmin.password
                        && newHotel.nome && newHotel.descrizione && newHotel.telefono && newHotel.indirizzo && newHotel.publicKey) {
                        dispatch(loginActions.adminRegister({
                            admin: newAdmin,
                            hotel: newHotel
                        }))
                    }
                }}>
                Crea hotel e registrati
            </Button>
        </>
    )
}

export default HotelCreation;