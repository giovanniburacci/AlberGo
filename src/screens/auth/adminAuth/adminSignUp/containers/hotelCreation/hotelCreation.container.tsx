import React, {useState} from 'react';
import OnlyAccount from '../../tabs/onlyAccount/onlyAccount.component';
import {AdminCreation} from '../../../types';
import CreateHotel from '../../tabs/createHotel/createHotel.component';
import {HotelDTO} from '../../../../../../models/models';
import {Button} from 'antd';

export const HotelCreation = () => {
    const [newAdmin, setNewAdmin] = useState<Partial<AdminCreation>>();
    const [newHotel, setNewHotel] = useState<Partial<HotelDTO>>()

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
                onClick={() => null}>
                Crea hotel e registrati
            </Button>
        </>
    )
}

export default HotelCreation;