export interface ClienteDTO {
    id: String,
    nome: String,
    cognome: String,
    telefono: String,
    documento: String,
    idHotel: String
}

export interface PrenotazioneDTO {
    id: String,
    dataInizio: Date,
    dataFine: Date,
    idCliente: String,
    idStanza: String,
    idHotel: String
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
    id: String,
    numeroStanza: number,
    fuoriServizio: boolean,
    descrizione: String,
    metriQuadri: number,
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
    id: String,
    nome: String,
    cognome: String,
    username: String,
    password: String,
    idHotel: String
}

export interface HotelDTO {
    id: String,
    nome:String,
    indirizzo: String,
    stelle: Stelle
    descrizione: String,
    telefono: String
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