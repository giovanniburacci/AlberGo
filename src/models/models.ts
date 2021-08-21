export interface Cliente {
    idCliente: String,
    nome: String,
    cognome: String,
    email: String,
    telefono: String,
    documento: String,
    idHotel: String
}

export interface Prenotazione {
    idPrenotazione: String,
    dataInizio: Date,
    dataFine: Date,
    idCliente: String,
    idStanza: String,
    idHotel: String
}

export interface Stanza {
    idStanza: String,
    numStanza: number,
    fuoriServizio: boolean,
    descrizioneStanza: String,
    mq: number,
    idCategoria: String,
    idHotel: String
}

export interface Categoria {
    idCategoria: String,
    nome: String,
    prezzo: number,
    descrizioneCategoria: String,
    idHotel: String
}

export interface Amministratore {
    idAmministratore: String,
    nome: String,
    cognome: String,
    username: String,
    email: String,
    password: String,
    idHotel: String
}

export interface Hotel {
    idHotel: String,
    indirizzo: String,
    stelle: Stelle
    descrizione: String,
    telefonoReception: String
}

export enum Stelle  {
    UNO = 1,
    DUE = 2,
    TRE = 3,
    QUATTRO = 4,
    CINQUE = 5,
    SEI = 6,
    SETTE = 7
}