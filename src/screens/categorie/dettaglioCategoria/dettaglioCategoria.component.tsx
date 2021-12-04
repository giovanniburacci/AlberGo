import React, {useEffect, useState} from 'react';
import {CategoriaDTO} from '../../../models/models';
import {Button, Checkbox, Input, InputNumber, message, Typography} from 'antd';
import './dettaglioCategoria.scss'
import categorieActions from '../../../store/categorie/categorie.action';
import {isEqual} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import categorieSelector from '../../../store/categorie/categorie.selector';
import {ArgsProps} from 'antd/es/message';
const {Title} = Typography;
const componentClassName = 'DettaglioCategoria';

interface DettaglioCategoriaProps {
    categoria?: CategoriaDTO,
    closeDrawer: () => void
}
export const DettaglioCategoria = (props:DettaglioCategoriaProps) => {
    const {categoria, closeDrawer} = props;
    const [newCategoria, setNewCategoria] = useState<Partial<CategoriaDTO>>(categoria!);
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(!!(categoria?.giorniPenale && categoria?.qtaPenale));
    const [hasClickedOnEdit, setHasClickedOnEdit] = useState<boolean>(false);
    const [hasClickedOnDelete, setHasClickedOnDelete] = useState<boolean>(false);

    const isLoadingEdit = useSelector(categorieSelector.getIsLoadingEdit);
    const isLoadingDelete = useSelector(categorieSelector.getIsLoadingDelete);
    const isErrorEdit = useSelector(categorieSelector.getIsLoadingEdit);
    const isErrorDelete = useSelector(categorieSelector.getIsErrorDelete);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoadingEdit && hasClickedOnEdit) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto modificando la categoria...'
            } as ArgsProps);
        }
        else if(isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella modifica della categoria!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingEdit && !isErrorEdit && hasClickedOnEdit) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Categoria modificata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoadingEdit, isErrorEdit])

    useEffect(() => {
        if(isLoadingDelete && hasClickedOnDelete) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto eliminando la categoria...'
            } as ArgsProps);
        }
        else if(isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nell\'eliminazione della categoria!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoadingDelete && !isErrorDelete && hasClickedOnDelete) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Categoria eliminata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoadingDelete, isErrorDelete])

    useEffect(() => {
        if(!isEqual(categoria, newCategoria)) {
            setIsMakingChanges(true);
        } else {
            setIsMakingChanges(false);
        }
    }, [newCategoria]);

    if(!categoria) {
        return null;
    }
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Nome categoria
                </Title>
                <Input placeholder="Nome" disabled value={newCategoria?.nome}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newCategoria.descrizione) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input placeholder="Descrizione" onChange={(event) => {
                    setNewCategoria((prevState => {
                        return {
                            ...prevState,
                            descrizione: event.target.value
                        }
                    }))
                }} value={newCategoria && newCategoria.descrizione && newCategoria.descrizione}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnEdit && !newCategoria.prezzo) ? 'error-input' : ''}`}>
                <Title level={5}>Prezzo</Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'€'}
                    placeholder={'Prezzo'}
                    value={newCategoria && newCategoria.prezzo && newCategoria.prezzo}
                    onChange={(value) => {
                        setNewCategoria(prevState => {
                            return {
                                ...prevState,
                                prezzo: value
                            }
                        })
                    }}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Limite per modifica/cancellazione prenotazioni</Title>
                <div className={`${(hasClickedOnEdit && newCategoria.giorniBlocco === null) ? 'error-input' : ''}`}>
                    <InputNumber
                        className={`${componentClassName}__inputgroup__inputnumber`}
                        addonAfter={'giorni'}
                        min={0}
                        defaultValue={0}
                        value={newCategoria?.giorniBlocco}
                        placeholder={'Giorni di blocco'}
                        onChange={(value) => {
                            setNewCategoria(prevState => {
                                return {
                                    ...prevState,
                                    giorniBlocco: value
                                }
                            })
                        }}/>
                </div>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Penali</Title>
                <Checkbox
                    onChange={(val) => {
                        setIsCheckboxChecked(val.target.checked);
                        setNewCategoria((prevState => ({
                            ...prevState,
                            giorniPenale: undefined,
                            qtaPenale: undefined
                        })))
                    }}
                    checked={isCheckboxChecked}>Voglio applicare delle penali a questa categoria di stanze</Checkbox>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Giorni massimi</Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'giorni'}
                    min={0}
                    placeholder={'Giorni massimi'}
                    disabled={!isCheckboxChecked}
                    value={newCategoria?.giorniPenale}
                    onChange={(value) => {
                        setNewCategoria(prevState => {
                            return {
                                ...prevState,
                                giorniPenale: value
                            }
                        })
                    }}/>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Costo penale</Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'€'}
                    min={0}
                    value={newCategoria?.qtaPenale}
                    disabled={!isCheckboxChecked}
                    placeholder={'Costo penale'}
                    onChange={(value) => {
                        setNewCategoria(prevState => {
                            return {
                                ...prevState,
                                qtaPenale: value
                            }
                        })
                    }}/>
            </div>
            <Button
                size={'large'}
                className={isMakingChanges ? 'button-edit' : ''}
                disabled={!isMakingChanges}
                onClick={() => {
                    setHasClickedOnEdit(true);
                    if(newCategoria && newCategoria.descrizione && newCategoria.nome && newCategoria.prezzo && newCategoria.giorniBlocco !== null) {
                        dispatch(categorieActions.editCategoria({
                            ...categoria,
                            ...newCategoria,
                            giorniPenale: newCategoria.giorniPenale ? newCategoria.giorniPenale : 0,
                            qtaPenale: newCategoria.qtaPenale ? newCategoria.qtaPenale : 0
                        }))
                    }
                }}
                loading={false}>Modifica</Button>
            <Button
                size={'large'}
                className={'button-delete'}
                onClick={() => {
                    setHasClickedOnDelete(true);
                    dispatch(categorieActions.removeCategoria(categoria));
                }}
            >Elimina</Button>
        </div>    )
}

export default DettaglioCategoria;