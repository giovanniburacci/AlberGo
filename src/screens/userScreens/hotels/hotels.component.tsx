import React, {useState} from 'react';
import HotelsList from './hotelsList/hotelsList.component';
import './hotels.scss'
import {HotelDTO} from '../../../models/models';
import NuovaPrenotazione from '../../../screens/prenotazioni/nuovaPrenotazione/nuovaPrenotazione.component';
import {Drawer} from 'antd';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../store/auth/auth.selector';
const componentClassName = 'Hotels'
export const Hotels = () => {

    const [selectedHotel, setSelectedHotel] = useState<HotelDTO | undefined>()

    const loggedUser = useSelector(authSelector.getUser);
    return (
        <>
            <div className={`${componentClassName}`}>
                <HotelsList
                    setSelectedHotel={setSelectedHotel}
                />

            </div>
            <Drawer
                destroyOnClose={true}
                visible={!!selectedHotel}
                onClose={() => {
                    setSelectedHotel(undefined);
                }}
                className={'ant-drawer-title-white'}
                title={
                    <div style={{color: '#ffffff'}}>
                        Nuova prenotazione
                    </div>
                }
                width={'348px'}>
                <NuovaPrenotazione
                    cliente={loggedUser}
                    hotel={selectedHotel}
                    closeDrawer={() => setSelectedHotel(undefined)}/>
            </Drawer>
        </>
    )
}

export default Hotels;