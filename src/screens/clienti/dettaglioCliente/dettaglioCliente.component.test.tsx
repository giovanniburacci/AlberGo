import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DettaglioCliente from './dettaglioCliente.component';
import {getClienteStub} from '../../../mocks/stubs/cliente';

describe('Dettaglio stanza tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const clienteStub = getClienteStub();
    it('DettaglioCliente gets properly loaded', () => {
        const dettaglioStanza = render(<DettaglioCliente selectedCliente={clienteStub} />)
        const nome = dettaglioStanza.getByPlaceholderText('Nome').innerText;
        const cognome = dettaglioStanza.getByPlaceholderText('Cognome').innerText;
        const telefono = dettaglioStanza.getByPlaceholderText('Telefono').innerText;
        const documento = dettaglioStanza.getByPlaceholderText('Documento').innerText;

        expect(nome === clienteStub.nome);
        expect(cognome === clienteStub.cognome);
        expect(telefono === clienteStub.telefono);
        expect(documento === clienteStub.documento);

    });
})
