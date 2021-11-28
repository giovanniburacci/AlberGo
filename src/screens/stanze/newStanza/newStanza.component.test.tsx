import React from 'react';
import {fireEvent, render, waitForDomChange, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as stanzeServices from '../../../api/stanze.service'
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import stanzeActions from '../../../store/stanze/stanze.action';
import NewStanza from './newStanza.component';
import {RootState} from '../../../store/reducer.config';
import {getCategorieStub} from '../../../mocks/stubs/categorie';

describe('Dettaglio stanza tests', () => {

    const mockStore = configureStore([thunk]);
    const categoriaStub = getCategorieStub()[0]
    const store = mockStore({
        categorie: {
            categorie: [
                categoriaStub
            ]
        }
    } as Partial<RootState>);

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    it('Can create new stanza', async () => {
        const dettaglioStanza = render(<NewStanza />)
        const numStanza = dettaglioStanza.getByPlaceholderText('Numero stanza');
        const descrizione = dettaglioStanza.getByPlaceholderText('Descrizione');
        const metriQuadri = dettaglioStanza.getByPlaceholderText('Metri quadri');
        const confirmButton = dettaglioStanza.getByText('Conferma');
        fireEvent.change(numStanza, {
            target: {
                value: '1'
            }
        });
        fireEvent.change(descrizione, {
            target: {
                value: 'descrizione test'
            }
        });
        fireEvent.change(metriQuadri, {
            target: {
                value: '40'
            }
        });

        const categoriaSelect = await dettaglioStanza.getByRole('combobox');

        fireEvent.change(categoriaSelect, {
            target: {
                value: 'cat0'
            }
        });

        fireEvent.click(confirmButton);

        const expectedActions: any[] = [
            {
                type: 'addStanza/pending'
            },
            {
                type: 'fetchStanze/pending'
            },
            {
                payload: {
                    descrizione: 'descrizione test',
                    idCategoria: 1,
                    idHotel: 1,
                    metriQuadri: 40,
                    numeroStanza: 1
                },
                type: 'addStanza/fulfilled'
            },
            {
                type: 'fetchStanze/fulfilled',
                payload: []
            }
        ]

        jest.spyOn(stanzeServices,'createStanza').mockImplementation(() => Promise.resolve(fakeAxiosReturn({
            numeroStanza: 1,
            descrizione: 'descrizione test',
            metriQuadri: 40,
            idCategoria: 1,
            idHotel: 1
        })));

        jest.spyOn(stanzeServices, 'searchStanze').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        return store.dispatch<any>(stanzeActions.addStanza({
            numeroStanza: 1,
            descrizione: 'descrizione test',
            metriQuadri: 40,
            idCategoria: 1,
            idHotel: 1
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

})
