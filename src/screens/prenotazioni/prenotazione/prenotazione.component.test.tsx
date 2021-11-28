import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as prenotazioniServices from '../../../api/prenotazioni.service'
import {Prenotazione} from './prenotazione.component';
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import stanzeActions from '../../../store/stanze/stanze.action';
import {getFatturaStub} from '../../../mocks/stubs/prenotazioni';
import prenotazioniActions from '../../../store/prenotazioni/prenotazioni.action';
import * as stanzeServices from 'src/api/stanze.service';

describe('Prenotazione tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    const prenotazioneStub = getFatturaStub();
    it('Prenotazione gets properly loaded', () => {
        const prenotazione = render(<Prenotazione prenotazione={prenotazioneStub} />)
        const nome = prenotazione.getByPlaceholderText('Nome').innerText;
        const cognome = prenotazione.getByPlaceholderText('Cognome').innerText;
        const telefono = prenotazione.getByPlaceholderText('Telefono').innerText;
        const documento = prenotazione.getByPlaceholderText('Documento').innerText;
        const stanza = prenotazione.getByPlaceholderText('Stanza').innerText;

        expect(nome === prenotazioneStub.cliente.nome);
        expect(cognome === prenotazioneStub.cliente.cognome);
        expect(telefono === prenotazioneStub.cliente.telefono);
        expect(documento === prenotazioneStub.cliente.documento);
        expect(parseInt(stanza) === prenotazioneStub.stanza.numeroStanza);

    });

    it('Stanza can be deleted', () => {
        const prenotazione = render(<Prenotazione prenotazione={prenotazioneStub} />)

        const deleteButton = prenotazione.getByText('Elimina');

        expect(deleteButton).toBeEnabled()


        fireEvent.click(deleteButton);

        jest.spyOn(prenotazioniServices,'searchPrenotazioni').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        jest.spyOn(prenotazioniServices,'deletePrenotazione').mockImplementation(() => Promise.resolve(fakeAxiosReturn(true)));

        const expectedActions:any[] = [
            {
                type: 'removePrenotazione/pending',
            },
            {
                type: 'fetchPrenotazioni/pending',
            },
            {
                type: 'removePrenotazione/fulfilled'
            },
            {
                type: 'fetchPrenotazioni/fulfilled',
                payload: []
            }
        ];

        return store.dispatch<any>(prenotazioniActions.removePrenotazione(prenotazioneStub.prenotazione)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

    it('Prenotazione can be edited', () => {
        const prenotazione = render(<Prenotazione prenotazione={prenotazioneStub} />)

        const editButton = prenotazione.getByText('Modifica');

        const dateInput = prenotazione.getAllByPlaceholderText('Select date')[1];
        fireEvent.change(dateInput, {
            target: {
                value: '2021-11-28'
            }
        });

        fireEvent.click(editButton);

        const expectedActions:any[] = [
            {
                type: 'editPrenotazione/pending'
            },
            {
                type: 'fetchPrenotazioni/pending'
            },
            {
                type: 'editPrenotazione/fulfilled'
            },
            {
                payload: [],
                type: 'fetchPrenotazioni/fulfilled'
            }
        ];

        jest.spyOn(prenotazioniServices,'updatePrenotazione').mockImplementation(() => Promise.resolve(fakeAxiosReturn({
            ...prenotazioneStub.prenotazione,
            dataFine: new Date('2021-11-28')
        })));

        jest.spyOn(prenotazioniServices,'searchPrenotazioni').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        return store.dispatch<any>(prenotazioniActions.editPrenotazione({
            ...prenotazioneStub.prenotazione,
            dataFine: new Date('2021-11-28')
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })
    });
})
