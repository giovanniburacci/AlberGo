export interface ClienteDTO {
    idCliente: String,
    nome: String,
    cognome: String,
    email: String,
    telefono: String,
    documento: String,
    idHotel: String
}

export interface PrenotazioneDTO {
    idPrenotazione: String,
    dataInizio: Date,
    dataFine: Date,
    idCliente: String,
    idStanza: String,
    idHotel: String
}

export interface StanzaDTO {
    idStanza: String,
    numStanza: number,
    fuoriServizio: boolean,
    descrizioneStanza: String,
    mq: number,
    idCategoria: String,
    idHotel: String
}

export interface CategoriaDTO {
    idCategoria: String,
    nome: String,
    prezzo: number,
    descrizioneCategoria: String,
    idHotel: String
}

export interface AmministratoreDTO {
    idAmministratore: String,
    nome: String,
    cognome: String,
    username: String,
    email: String,
    password: String,
    idHotel: String
}

export interface HotelDTO {
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