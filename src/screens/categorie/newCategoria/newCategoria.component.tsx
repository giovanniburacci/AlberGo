import React, {useEffect, useState} from 'react'
import {Button, Checkbox, Input, InputNumber, message, Select, Typography} from 'antd';
import './newCategoria.scss'
import {CategoriaDTO} from '../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import categorieActions from '../../../store/categorie/categorie.action';
import hotelSelector from '../../../store/hotel/hotel.selector';
import categorieSelector from '../../../store/categorie/categorie.selector';
import {ArgsProps} from 'antd/es/message';
const componentClassName = 'NewCategoria';

interface NewCategoriaProps {
    closeDrawer: () => void
}
export const NewCategoria = (props: NewCategoriaProps) => {
    const {Title} = Typography;
    const {closeDrawer} = props;
    const [newCategoria, setNewCategoria] = useState<Partial<CategoriaDTO>>();
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);
    const idHotel = useSelector(hotelSelector.getHotelId)
    const isLoading = useSelector(categorieSelector.getIsLoadingCreate);
    const isError = useSelector(categorieSelector.getIsErrorCreate);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando la categoria...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione della categoria!'
            } as ArgsProps);
            closeDrawer();
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Categoria creata con successo!'
            } as ArgsProps);
            closeDrawer();
        }
    }, [isLoading, isError])

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCategoria?.nome) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Nome categoria
                </Title>
                <Input placeholder="Nome" onChange={(event) => {
                    setNewCategoria((prevState => {
                        return {
                            ...prevState,
                            nome: event.target.value
                        }
                    }))
                }} value={newCategoria && newCategoria.nome && newCategoria.nome}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCategoria?.descrizione) ? 'error-input' : ''}`}>
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
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCategoria?.prezzo) ? 'error-input' : ''}`}>
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
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newCategoria?.giorniBlocco) ? 'error-input' : ''}`}>
                <Title level={5}>Limite per modifica/cancellazione prenotazioni</Title>
                <InputNumber
                    className={`${componentClassName}__inputgroup__inputnumber`}
                    addonAfter={'giorni'}
                    placeholder={'Giorni di blocco'}
                    min={0}
                    defaultValue={0}
                    value={newCategoria?.giorniBlocco}
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
                            giorniPenale: 0,
                            qtaPenale: 0
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
                    placeholder={'Costo penale'}
                    disabled={!isCheckboxChecked}
                    onChange={(value) => {
                        setNewCategoria(prevState => {
                            return {
                                ...prevState,
                                qtaPenale: value
                            }
                        })
                    }}/>
            </div>
            <Button onClick={() => {
                setHasClickedOnConfirm(true);
                if(newCategoria && newCategoria.descrizione && newCategoria.nome && newCategoria.prezzo && newCategoria.giorniBlocco) {
                    if(!isCheckboxChecked) {
                        dispatch(categorieActions.addCategoria({
                            ...newCategoria,
                            giorniPenale: 0,
                            qtaPenale: 0,
                            idHotel
                        }));
                        setNewCategoria((prevState => ({
                            ...prevState,
                            giorniPenale: 0,
                            qtaPenale: 0
                        })))
                    } else {
                        dispatch(categorieActions.addCategoria({
                            ...newCategoria,
                            idHotel
                        }));
                    }
                }
            }}>Conferma</Button>
        </div>
    )
}

export default NewCategoria;