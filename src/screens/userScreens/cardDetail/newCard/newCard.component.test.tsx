import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import * as stripeServices from '../../../../api/stripe.service'
import {actionTypeAdapter, fakeAxiosReturn} from '../../../../setupTests';
import cardActions from '../../../../store/card/card.actions';
import NewCard from './newCard.component';
import {mockedCard} from '../../../../mocks/stubs/card';

describe('Dettaglio stanza tests', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore();

    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(store.getState()));
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    it('Can save new card', async () => {
        const newCard = render(<NewCard />)
        const numero = newCard.getByPlaceholderText('Numero');
        const cvc = newCard.getByPlaceholderText('CVC');
        const meseScadenza = newCard.getByPlaceholderText('Mese scadenza');
        const annoScadenza = newCard.getByPlaceholderText('Anno scadenza');
        const saveButton = newCard.getByText('Salva carta');

        fireEvent.change(numero, {
            target: {
                value: mockedCard.number
            }
        });
        fireEvent.change(cvc, {
            target: {
                value: mockedCard.cvc
            }
        });
        fireEvent.change(meseScadenza, {
            target: {
                value: mockedCard.exp_month
            }
        });
        fireEvent.change(annoScadenza, {
            target: {
                value: mockedCard.exp_year
            }
        });

        fireEvent.click(saveButton);

        const expectedActions: any[] = [
            {
                type: 'addCard/pending'
            },
            {
                payload: mockedCard,
                type: 'addCard/fulfilled'
            }
        ]

        jest.spyOn(stripeServices,'createCard').mockImplementation(() => Promise.resolve(fakeAxiosReturn(mockedCard)));

        return store.dispatch<any>(cardActions.addCard(mockedCard)).then(() => {
            expect(store.getActions().map(action => actionTypeAdapter(action))).toEqual(expectedActions);
        })

    });

})
