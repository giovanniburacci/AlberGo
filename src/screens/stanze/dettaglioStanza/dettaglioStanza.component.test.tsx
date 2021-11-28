import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as stanzeServices from '../../../api/stanze.service'
import DettaglioStanza from './dettaglioStanza.component';
import {getStanzeStub} from '../../../mocks/stubs/stanze';
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import stanzeActions from '../../../store/stanze/stanze.action';

describe('Dettaglio stanza tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    const stanzaStub = getStanzeStub()[0];

    it('Stanza gets properly loaded', () => {
        const dettaglioStanza = render(<DettaglioStanza stanza={stanzaStub} resetFilters={() => -1}/>)
        const numStanza = dettaglioStanza.getByPlaceholderText('Numero stanza').innerText;
        const descrizione = dettaglioStanza.getByPlaceholderText('Descrizione').innerText;
        const metriQuadri = dettaglioStanza.getByPlaceholderText('Metri quadri').innerText;

        expect(parseInt(numStanza) === stanzaStub.numeroStanza);
        expect(descrizione === stanzaStub.descrizione);
        expect(parseInt(metriQuadri) === stanzaStub.metriQuadri);

    });

    it('Stanza can be edited', () => {
        const dettaglioStanza = render(<DettaglioStanza stanza={stanzaStub} resetFilters={() => -1}/>)

        const descrizioneInput = dettaglioStanza.getByPlaceholderText('Descrizione');
        const editButton = dettaglioStanza.getByText('Modifica');

        expect(editButton).toBeDisabled()

        fireEvent.change(descrizioneInput, {
            target: {
                value: 'nuova descrizione'
            }
        });

        expect(editButton).toBeEnabled();
        fireEvent.click(editButton);

        jest.spyOn(stanzeServices,'updateStanza').mockImplementation(() => Promise.resolve(fakeAxiosReturn({
            ...stanzaStub,
            descrizione: 'nuova descrizione'
        })));

        jest.spyOn(stanzeServices,'searchStanze').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                'type': 'editStanza/pending',
            },
            {
                'type': 'fetchStanze/pending',
            },
            {
                'payload': {
                    ...stanzaStub,
                    descrizione: 'nuova descrizione'
                },
                'type': 'editStanza/fulfilled'
            },
            {
                'payload': [],
                'type': 'fetchStanze/fulfilled',
            },
        ];

        return store.dispatch<any>(stanzeActions.editStanza({
            ...stanzaStub,
            descrizione: 'nuova descrizione'
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

    it('Stanza can be deleted', () => {
        const dettaglioStanza = render(<DettaglioStanza stanza={stanzaStub} resetFilters={() => -1}/>)

        const deleteButton = dettaglioStanza.getByText('Elimina');

        expect(deleteButton).toBeEnabled();

        fireEvent.click(deleteButton);

        jest.spyOn(stanzeServices,'deleteStanza').mockImplementation(() => Promise.resolve(fakeAxiosReturn(true)));

        const expectedActions:any[] = [
            {
                'type': 'removeStanza/pending',
            },
            {
                'payload': true,
                'type': 'removeStanza/fulfilled'
            }
        ];

        return store.dispatch<any>(stanzeActions.removeStanza(stanzaStub.id)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });
})
