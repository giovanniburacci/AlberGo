import React from 'react';
import {Tabs} from 'antd'
const componentClassName = 'AdminSignUp'

const {TabPane} = Tabs;
export const AdminSignUp = () => {

    return (
        <div className={`${componentClassName}`}>
            <Tabs>
                <TabPane key={1} tab={'Crea la tua prima struttura'}>

                </TabPane>

                <TabPane key={2} tab={'Possiedo già una struttura'}>

                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminSignUp;