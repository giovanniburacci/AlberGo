import React, {useEffect, useState} from 'react';
import './prenotazioni.scss'
import {ColumnsType} from 'antd/es/table';
import {Drawer, Table} from 'antd';
import Prenotazione from './prenotazione/prenotazione.component';
import PrenotazioniBar from './prenotazioniBar/prenotazioniBar.component';
import NuovaPrenotazione from './nuovaPrenotazione/nuovaPrenotazione.component';
import {FatturaDTO} from '../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import PrenotazioniList from './prenotazioniList/prenotazioniList.component';
import {loginSelector} from '../../store/login/login.selector';

const componentClassName = 'Prenotazioni';

const Prenotazioni = () => {

    const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
    const [selectedPrenotazione, setSelectedPrenotazione] = useState<FatturaDTO>();
    const [isCreatingPrenotazione, setIsCreatingPrenotazione] = useState<boolean>(false);

    const isAdmin = !!useSelector(loginSelector.getAmministratore);
    return (
        <>
            <div className={`${componentClassName}`}>
                {
                    isAdmin && (
                        <PrenotazioniBar setHasClickedNew={() => {
                            setIsDrawerVisible(true);
                            setIsCreatingPrenotazione(true);
                        }}/>
                    )
                }
                <PrenotazioniList
                    setSelectedPrenotazione={setSelectedPrenotazione}
                    setIsDrawerVisible={() => setIsDrawerVisible(true)}/>

            </div>
            <Drawer
                destroyOnClose={true}
                visible={isDrawerVisible}
                onClose={() => {
                    setSelectedPrenotazione((prevState => {
                        if(prevState) {
                            return undefined;
                        }
                    }));
                    setIsDrawerVisible(false);
                    setIsCreatingPrenotazione(false);
                }}
                className={'ant-drawer-title-white'}
                title={ selectedPrenotazione ? (
                    <div style={{color: '#ffffff'}}>
                        Dettaglio prenotazione
                    </div>
                ) : isCreatingPrenotazione && (
                    <div style={{color: '#ffffff'}}>
                        Nuova prenotazione
                    </div>
                )}
                width={'348px'}>
                { selectedPrenotazione ? (
                    <Prenotazione
                        prenotazione={selectedPrenotazione}
                    />
                ) :  isCreatingPrenotazione && (
                    <NuovaPrenotazione />
                )}
            </Drawer>
        </>
    )
}

export default Prenotazioni;