import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as prenotazioniServices from '../../../api/prenotazioni.service'
import NuovaPrenotazione from './nuovaPrenotazione.component';
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import {getClienteStub} from '../../../mocks/stubs/cliente';
import {getServiziStub} from '../../../mocks/stubs/servizi';
import {getPrenotazioniStub} from 'src/mocks/stubs/prenotazioni';

describe('NuovaPrenotazione tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore({
        clienti: {
            clienti: [
                getClienteStub()
            ]
        }
    });

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    it('Prenotazione can be created', () => {
        const nuovaPrenotazione = render(<NuovaPrenotazione />)
        const nome = nuovaPrenotazione.getByPlaceholderText('Nome');
        const cognome = nuovaPrenotazione.getByPlaceholderText('Cognome');
        const telefono = nuovaPrenotazione.getByPlaceholderText('Telefono');
        const documento = nuovaPrenotazione.getByPlaceholderText('Documento');
        const dataStart = nuovaPrenotazione.getAllByPlaceholderText('Select date')[0];
        const dataEnd = nuovaPrenotazione.getAllByPlaceholderText('Select date')[1];
        const stanza = nuovaPrenotazione.getAllByRole('combobox')[1];
        const servizi = nuovaPrenotazione.getAllByRole('combobox')[2];

        const stubbedCliente = getClienteStub();
        const stubbedServizi = getServiziStub();

        fireEvent.change(nome, {
            target: {
                value: stubbedCliente.nome
            }
        })

        fireEvent.change(cognome, {
            target: {
                value: stubbedCliente.cognome
            }
        })

        fireEvent.change(telefono, {
            target: {
                value: stubbedCliente.telefono
            }
        });

        fireEvent.change(documento, {
            target: {
                value: stubbedCliente.documento
            }
        });

        fireEvent.change(stanza, {
            target: {
                value: '1'
            }
        });

        fireEvent.change(dataStart, {
            target: {
                value: '2011-11-29'
            }
        });

        fireEvent.change(dataEnd, {
            target: {
                value: '2011-12-05'
            }
        });

        fireEvent.change(servizi, {
            target: {
                value: '0'
            }
        });

        fireEvent.change(servizi, {
            target: {
                value: '1'
            }
        });

        const expectedActions = [
            {
                type: 'addPrenotazione/pending'
            },
            {
                type: 'fetchPrenotazioni/pending'
            },
            {
                payload: {},
                type: 'addPrenotazione/fulfilled'
            },
            {
                payload: [],
                type: 'fetchPrenotazioni/fulfilled'
            }
        ]

        jest.spyOn(prenotazioniServices,'searchPrenotazioni').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        jest.spyOn(prenotazioniServices,'createPrenotazione').mockImplementation(() => Promise.resolve(fakeAxiosReturn({})));

        return store.dispatch<any>(prenotazioniActions.addPrenotazione({
            prenotazione: {
                idCliente: stubbedCliente.id,
                idHotel: 1,
                idStanza: 1,
                dataInizio: new Date(dataStart.innerText),
                dataFine: new Date(dataEnd.innerText)
            },
            servizi: [stubbedServizi[0],stubbedServizi[1]]
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });
})
