import {CategoriaDTO} from '../../models/models';

export interface CategorieState extends CategorieCreateState, NumeroStanzeState{
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
export interface NumeroStanze {
    [idCategoria:number]: number
}