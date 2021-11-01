export interface ClienteDTO {
    id: number,
    nome: string,
    cognome: string,
    telefono: string,
    documento: string,
    idHotel: number,
    username: string
}

export interface PrenotazioneDTO {
    id: number,
    dataInizio: Date,
    dataFine: Date,
    idCliente: number,
    idStanza: number,
    idHotel: number
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

    giorniBlocco: number,
    giorniPenale: number,
    qtaPenale: number
}

export interface AmministratoreDTO {
    id: number,
    nome: string,
    cognome: string,
    username: string,
    idHotel: number
}

export interface HotelDTO {
    id: number,
    nome:string,
    indirizzo: string,
    stelle: Stelle
    descrizione: string,
    telefono: string
}

export interface ServizioDTO {
    id: number,
    nome: string,
    prezzo: number,
    idHotel: number,
    idPrenotazione: number
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

export interface FilterBean {
    nomeCliente: string,
    cognomeCliente: string,
    dataInizio: string,
    dataFine: string,
    idHotel: number
}

export interface FetchCategorieWithName {
    nome: string,
    idHotel: number
}