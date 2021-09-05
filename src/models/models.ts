export interface ClienteDTO {
    id: string,
    nome: string,
    cognome: string,
    telefono: string,
    documento: string,
    idHotel: string
}

export interface PrenotazioneDTO {
    id: string,
    dataInizio: Date,
    dataFine: Date,
    idCliente: string,
    idStanza: string,
    idHotel: string
}

export interface PrenotazioneIbridaDTO {
    nome: string,
    cognome: string,
    dataInizio: Date,
    dataFine: Date,
    numeroStanza: number,
    telefono: string,
    idPrenotazione: string
}

export interface StanzaDTO {
    id: string,
    numeroStanza: number,
    fuoriServizio: boolean,
    descrizione: string,
    metriQuadri: number,
    idCategoria: string,
    idHotel: string
}

export interface CategoriaDTO {
    idCategoria: string,
    nome: string,
    prezzo: number,
    descrizioneCategoria: string,
    idHotel: string
}

export interface AmministratoreDTO {
    id: string,
    nome: string,
    cognome: string,
    username: string,
    password: string,
    idHotel: string
}

export interface HotelDTO {
    id: string,
    nome:string,
    indirizzo: string,
    stelle: Stelle
    descrizione: string,
    telefono: string
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