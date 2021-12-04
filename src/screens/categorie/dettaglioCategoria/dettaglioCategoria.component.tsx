import React, {useEffect, useState} from 'react';
import {CategoriaDTO} from '../../../models/models';
import {Button, Checkbox, Input, InputNumber, Typography} from 'antd';
import './dettaglioCategoria.scss'
import categorieActions from '../../../store/categorie/categorie.action';
import {isEqual} from 'lodash';
import {useDispatch} from 'react-redux';
const {Title} = Typography;
const componentClassName = 'DettaglioCategoria';

interface DettaglioCategoriaProps {
    categoria?: CategoriaDTO,
}
export const DettaglioCategoria = (props:DettaglioCategoriaProps) => {
    const {categoria} = props;
    const [newCategoria, setNewCategoria] = useState<Partial<CategoriaDTO>>(categoria!);
    const [isMakingChanges, setIsMakingChanges] = useState<boolean>(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(!!(categoria?.giorniPenale && categoria?.qtaPenale));

    const dispatch = useDispatch();
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
            <div className={`${componentClassName}__inputgroup`}>
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
            <div className={`${componentClassName}__inputgroup`}>
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
                    if(newCategoria) {
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
                    dispatch(categorieActions.removeCategoria(categoria));
                }}
            >Elimina</Button>
        </div>    )
}

export default DettaglioCategoria;