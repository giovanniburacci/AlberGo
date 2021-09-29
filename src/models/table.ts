interface TableSorter<E> {
    compare: (a:E,b:E) => number
    multiple?: number
}

export interface PrenotazioniColumns<E> {
    title: string,
    dataIndex: string,
    multipleSorter?: TableSorter<E>,
    sorter?: (a:E,b:E) => number
    width?: number
}

export interface PrenotazioneIbridaMapper {
    nome: string,
    cognome: string,
    dataInizio: string,
    dataFine: string,
    numeroStanza: number,
    telefono: string,
    idPrenotazione: string,
    nomeCategoria: string,
    documento: string
}