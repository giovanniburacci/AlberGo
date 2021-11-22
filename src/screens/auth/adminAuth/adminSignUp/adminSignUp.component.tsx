import React from 'react';
import {Tabs} from 'antd'
import AccountCreation from './containers/accountCreation/accountCreation.container';
import HotelCreation from './containers/hotelCreation/hotelCreation.container';
import './adminSignUp.scss'
const componentClassName = 'AdminSignUp'

const {TabPane} = Tabs;
export const AdminSignUp = () => {

    return (
        <div className={`${componentClassName}`}>
            <Tabs>
                <TabPane key={1} tab={'Crea la tua prima struttura'}>
                    <HotelCreation />
                </TabPane>
                <TabPane key={2} tab={'Possiedo già una struttura'}>
                    <AccountCreation />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminSignUp;