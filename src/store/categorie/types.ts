import {CategoriaDTO} from '../../models/models';

export interface CategorieState extends CategorieCreateState, CategorieDeleteState, CategorieUpdateState, NumeroStanzeState{
    categorie?: CategoriaDTO[]
    isLoading: boolean,
    isError: boolean,

}

export interface NumeroStanzeState {
    numeroStanze?: NumeroStanze[]
    isLoadingNumeroStanze: boolean,
    isErrorNumeroStanze: boolean
}
export interface CategorieCreateState {
    isLoadingCreate: boolean,
    isErrorCreate: boolean
}

export interface CategorieDeleteState {
    isLoadingDelete: boolean,
    isErrorDelete: boolean
}

export interface CategorieUpdateState {
    isLoadingUpdate: boolean,
    isErrorUpdate: boolean
}
export interface NumeroStanze {
    [idCategoria:number]: number
}