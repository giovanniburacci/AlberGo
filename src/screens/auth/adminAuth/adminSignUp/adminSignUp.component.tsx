import React from 'react';
import {Tabs} from 'antd'
import AccountCreation from './containers/accountCreation/accountCreation.container';
import HotelCreation from './containers/hotelCreation/hotelCreation.container';
import './adminSignUp.scss'
const componentClassName = 'AdminSignUp'

const {TabPane} = Tabs;

interface AdminSignUpProps {
    closeModal: () => void
}
export const AdminSignUp = (props: AdminSignUpProps) => {

    const {closeModal} = props;
    return (
        <div className={`${componentClassName}`}>
            <Tabs>
                <TabPane key={1} tab={'Crea la tua prima struttura'}>
                    <HotelCreation closeModal={closeModal} />
                </TabPane>
                <TabPane key={2} tab={'Possiedo già una struttura'}>
                    <AccountCreation closeModal={closeModal} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminSignUp;