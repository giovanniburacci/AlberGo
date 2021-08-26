interface TableSorter<E> {
    compare: (a:E,b:E) => number
    multiple?: number
}

export interface PrenotazioniColumns<E> {
    title: string,
    dataIndex: string,
    sorter?: TableSorter<E>
}

export interface PrenotazioneMapper {
    idPrenotazione: string,
    idStanza: string,
    dataInizio: string,
    dataFine: string
}