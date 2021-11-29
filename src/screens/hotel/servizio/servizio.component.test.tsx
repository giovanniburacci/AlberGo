import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as serviziServices from '../../../api/servizi.service'
import Servizio from './servizio.component';
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import {getServiziStub} from '../../../mocks/stubs/servizi';
import serviziActions from '../../../store/servizi/servizi.action';

describe('Dettaglio stanza tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    const servizioStub = getServiziStub()[0];
    it('Stanza gets properly loaded', () => {
        const dettaglioStanza = render(<Servizio servizio={servizioStub} />)
        const nome = dettaglioStanza.getByPlaceholderText('Nome').innerText;
        const prezzo = dettaglioStanza.getByPlaceholderText('Prezzo').innerText;

        expect(nome === servizioStub.nome);
        expect(parseInt(prezzo) === servizioStub.prezzo);

    });

    it('Stanza can be edited', () => {
        const servizio = render(<Servizio servizio={servizioStub} />)
        const prezzo = servizio.getByPlaceholderText('Prezzo');
        const editButton = servizio.getByText('Modifica')
        expect(editButton).toBeDisabled()

        fireEvent.change(prezzo, {
            target: {
                value: '30'
            }
        });

        fireEvent.click(editButton);

        jest.spyOn(serviziServices,'updateServizio').mockImplementation(() => Promise.resolve(fakeAxiosReturn({
            ...servizioStub,
            prezzo: 30
        })));

        jest.spyOn(serviziServices,'searchServizi').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                'type': 'editServizio/pending',
            },
            {
                'type': 'fetchServizi/pending',
            },
            {
                'type': 'editServizio/fulfilled'
            },
            {
                'payload': [],
                'type': 'fetchServizi/fulfilled',
            },
        ];

        return store.dispatch<any>(serviziActions.editServizio({
            ...servizioStub,
            prezzo: 30
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

    it('Servizio can be deleted', () => {
        const servizio = render(<Servizio servizio={servizioStub} />)
        const deleteButton = servizio.getByText('Elimina');

        expect(deleteButton).toBeEnabled()

        fireEvent.click(deleteButton);

        jest.spyOn(serviziServices,'deleteServizio').mockImplementation(() => Promise.resolve(fakeAxiosReturn(true)));

        jest.spyOn(serviziServices,'searchServizi').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                'type': 'removeServizio/pending',
            },
            {
                'type': 'fetchServizi/pending',
            },
            {
                'type': 'removeServizio/fulfilled'
            },
            {
                'payload': [],
                'type': 'fetchServizi/fulfilled',
            },
        ];

        return store.dispatch<any>(serviziActions.removeServizio(servizioStub)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });
})
