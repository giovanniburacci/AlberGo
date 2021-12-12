import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as categorieServices from '../../../api/categorie.service'
import DettaglioCategoria from './dettaglioCategoria.component';
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
    it('DettaglioCategoria gets properly loaded', () => {
        const dettaglioCategoria = render(<DettaglioCategoria categoria={categoriaStub} closeDrawer={() => null}/>)
        const nome = dettaglioCategoria.getByPlaceholderText('Nome').innerText;
        const descrizione = dettaglioCategoria.getByPlaceholderText('Descrizione').innerText;
        const prezzo = dettaglioCategoria.getByPlaceholderText('Prezzo').innerText;
        const giorniBlocco = dettaglioCategoria.getByPlaceholderText('Giorni di blocco').innerText;
        const giorniPenale = dettaglioCategoria.getByPlaceholderText('Giorni massimi').innerText;
        const penale = dettaglioCategoria.getByPlaceholderText('Costo penale').innerText;

        expect(nome === categoriaStub.nome);
        expect(descrizione === categoriaStub.descrizione);
        expect(parseInt(prezzo) === categoriaStub.prezzo);
        expect(parseInt(giorniBlocco) === categoriaStub.giorniBlocco);
        expect(parseInt(giorniPenale) === categoriaStub.giorniPenale);
        expect(parseInt(penale) === categoriaStub.qtaPenale);

    });

    it('DettaglioCategoria can be edited', () => {
        const dettaglioCategoria = render(<DettaglioCategoria categoria={categoriaStub} closeDrawer={() => null}/>)
        const prezzo = dettaglioCategoria.getByPlaceholderText('Prezzo');

        fireEvent.change(prezzo, {
            target: {
                value: 30
            }
        });

        const editButton = dettaglioCategoria.getByText('Modifica')

        fireEvent.click(editButton);

        jest.spyOn(categorieServices,'updateCategoria').mockImplementation(() => Promise.resolve(fakeAxiosReturn({
            ...categoriaStub,
            prezzo: 30
        })));

        jest.spyOn(categorieServices,'searchCategorie').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                type: 'updateCategoria/pending'
            },
            {
                type: 'fetchCategorie/pending'
            },
            {
                type: 'fetchNumeroStanzeForCategoria/pending'
            },
            {
                payload: null,
                type: 'updateCategoria/fulfilled'
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

        return store.dispatch<any>(categorieActions.editCategoria({
            ...categoriaStub,
            prezzo: 30
        })).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

    it('DettaglioCategoria can be deleted', () => {
        const servizio = render(<DettaglioCategoria categoria={categoriaStub} closeDrawer={() => null}/>)
        const deleteButton = servizio.getByText('Elimina');

        fireEvent.click(deleteButton);

        jest.spyOn(categorieServices,'deleteCategoria').mockImplementation(() => Promise.resolve(fakeAxiosReturn(true)));

        jest.spyOn(categorieServices,'searchCategorie').mockImplementation(() => Promise.resolve(fakeAxiosReturn([])));

        const expectedActions:any[] = [
            {
                type: 'removeCategoria/pending'
            },
            {
                type: 'fetchCategorie/pending'
            },
            {
                type: 'fetchNumeroStanzeForCategoria/pending'
            },
            {
                payload: null,
                type: 'removeCategoria/fulfilled'
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

        return store.dispatch<any>(categorieActions.removeCategoria(categoriaStub)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });
})
