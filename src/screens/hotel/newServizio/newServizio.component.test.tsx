import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as serviziServices from '../../../api/servizi.service'
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import NewServizio from './newServizio.component';
import {getServiziStub} from '../../../mocks/stubs/servizi';
import serviziActions from '../../../store/servizi/servizi.action';

describe('New servizio tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    const servizioStub = getServiziStub()[0];
    it('Can create new servizio', async () => {
        const newServizio = render(<NewServizio />)
        const nome = newServizio.getByPlaceholderText('Nome');
        const prezzo = newServizio.getByPlaceholderText('Prezzo');
        const confirmButton = newServizio.getByText('Conferma');

        fireEvent.change(nome, {
            target: {
                value: servizioStub.nome
            }
        });
        fireEvent.change(prezzo, {
            target: {
                value: servizioStub.prezzo
            }
        });

        fireEvent.click(confirmButton);

        const expectedActions: any[] = [
            {
                type: 'addServizio/pending'
            },
            {
                type: 'fetchServizi/pending'
            },
            {
                type: 'addServizio/fulfilled'
            },
            {
                type: 'fetchServizi/fulfilled',
                payload: [servizioStub]
            }
        ]

        jest.spyOn(serviziServices,'createServizio').mockImplementation(() => Promise.resolve(fakeAxiosReturn(servizioStub)));

        jest.spyOn(serviziServices, 'searchServizi').mockImplementation(() => Promise.resolve(fakeAxiosReturn([servizioStub])));

        return store.dispatch<any>(serviziActions.addServizio(servizioStub)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

})
