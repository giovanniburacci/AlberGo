import {CategoriaDTO} from '../../models/models';

export interface CategorieState {
    categorie?: CategoriaDTO[]
    isLoading: boolean,
    isError: boolean
}