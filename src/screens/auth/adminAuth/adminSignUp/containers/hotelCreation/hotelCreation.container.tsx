import React, {useState} from 'react';
import OnlyAccount from '../../tabs/onlyAccount/onlyAccount.component';
import {AdminCreation} from '../../../types';
import CreateHotel from '../../tabs/createHotel/createHotel.component';
import {HotelDTO} from '../../../../../../models/models';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import loginActions from '../../../../../../store/login/login.action';

export const HotelCreation = () => {
    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();
    const [newHotel, setNewHotel] = useState<Partial<HotelDTO>>()
    const dispatch = useDispatch();
    return (
        <>
            <OnlyAccount newAdmin={newAdmin}
                         setNewAdmin={(item,value) => {setNewAdmin(prevState => ({...prevState, [item]: value}))}}
                         isCreatingHotel={true}/>
            <hr/>
            <CreateHotel newHotel={newHotel}
                         setNewHotel={(item,value) => {setNewHotel(prevState => ({...prevState, [item]: value}))}}/>
            <Button
                type={'primary'}
                style={{float: 'right'}}
                onClick={() => {
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