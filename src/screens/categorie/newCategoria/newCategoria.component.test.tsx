import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as categorieServices from '../../../api/categorie.service'
import NewCategoria from './newCategoria.component';
import {actionTypeAdapter, fakeAxiosReturn} from '../../../setupTests';
import {getCategorieStub} from '../../../mocks/stubs/categorie';
import categorieActions from '../../../store/categorie/categorie.action';

describe('Dettaglio stanza tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    const categoriaStub = getCategorieStub()[0];
    it('Categoria can be created', () => {
        const newCategoria = render(<NewCategoria />)
        const nome = newCategoria.getByPlaceholderText('Nome');
        const descrizione = newCategoria.getByPlaceholderText('Descrizione');
        const prezzo = newCategoria.getByPlaceholderText('Prezzo');
        const giorniBlocco = newCategoria.getByPlaceholderText('Giorni di blocco');
        const giorniPenale = newCategoria.getByPlaceholderText('Giorni massimi');
        const penale = newCategoria.getByPlaceholderText('Costo penale');

        fireEvent.change(nome, {
            target: {
                value: categoriaStub.nome
            }
        });

        fireEvent.change(descrizione, {
            target: {
                value: categoriaStub.descrizione
            }
        });

        fireEvent.change(penale, {
            target: {
                value: categoriaStub.qtaPenale
            }
        });

        fireEvent.change(prezzo, {
            target: {
                value: categoriaStub.prezzo
            }
        });

        fireEvent.change(giorniBlocco, {
            target: {
                value: categoriaStub.giorniBlocco
            }
        });

        fireEvent.change(giorniPenale, {
            target: {
                value: categoriaStub.giorniPenale
            }
        });

        const confirmButton = newCategoria.getByText('Conferma');
        fireEvent.click(confirmButton);

        jest.spyOn(categorieServices,'createCategoria').mockImplementation(() => Promise.resolve(fakeAxiosReturn(categoriaStub)));

        jest.spyOn(categorieServices,'searchCategorie').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                type: 'addCategoria/pending'
            },
            {
                type: 'fetchCategorie/pending'
            },
            {
                type: 'fetchNumeroStanzeForCategoria/pending'
            },
            {
                payload: categoriaStub,
                type: 'addCategoria/fulfilled'
            },
            {
                payload: {},
                type: 'fetchNumeroStanzeForCategoria/fulfilled'
            },
            {
                payload: [],
                type: 'fetchCategorie/fulfilled'
            }
        ]

        return store.dispatch<any>(categorieActions.addCategoria({
            ...categoriaStub,
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });
})
