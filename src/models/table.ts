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

export interface PrenotazioneMapper {
    id: string,
    idStanza: string,
    dataInizio: string,
    dataFine: string
}