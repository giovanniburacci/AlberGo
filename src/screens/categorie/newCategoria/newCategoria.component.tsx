import React, {useState} from 'react'
import {Button, Checkbox, Input, InputNumber, Select, Typography} from 'antd';
import './newCategoria.scss'
import {CategoriaDTO} from '../../../models/models';
import {useDispatch} from 'react-redux';
import categorieActions from '../../../store/categorie/categorie.action';
const componentClassName = 'NewCategoria';

export const NewCategoria = () => {
    const {Title} = Typography;
    const {Option} = Select;

    const [newCategoria, setNewCategoria] = useState<Partial<CategoriaDTO>>();
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const dispatch = useDispatch();
    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
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
                if(newCategoria && newCategoria.descrizione && newCategoria.nome && newCategoria.prezzo && newCategoria.giorniBlocco) {
                    if(!isCheckboxChecked) {
                        setNewCategoria((prevState => ({
                            ...prevState,
                            giorniPenale: 0,
                            qtaPenale: 0
                        })))
                    }
                    dispatch(categorieActions.addCategoria({
                        ...newCategoria,
                        idHotel: 1 // todo fix idHotel
                    }));
                }
            }}>Conferma</Button>
        </div>
    )
}

export default NewCategoria;