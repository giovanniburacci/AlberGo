export interface ClienteDTO {
    id: number,
    nome: string,
    cognome: string,
    telefono: string,
    documento: string,
    idHotel: string
}

export interface PrenotazioneDTO {
    id: number,
    dataInizio: Date,
    dataFine: Date,
    idCliente: string,
    idStanza: string,
    idHotel: string
}

export interface FatturaDTO {
    cliente: ClienteDTO,
    categoria: CategoriaDTO,
    stanza: StanzaDTO,
    hotel: HotelDTO,
    prenotazione: PrenotazioneDTO
}

export interface StanzaDTO {
    id: number,
    numeroStanza: number,
    fuoriServizio: boolean,
    descrizione: string,
    metriQuadri: number,
    idCategoria: number,
    idHotel: number
}

export interface CategoriaDTO {
    id: number,
    nome: string,
    prezzo: number,
    descrizione: string,
    idHotel: number
}

export interface AmministratoreDTO {
    id: number,
    nome: string,
    cognome: string,
    username: string,
    password: string,
    idHotel: string
}

export interface HotelDTO {
    id: number,
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