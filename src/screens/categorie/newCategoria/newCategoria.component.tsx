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
            <Button onClick={() => {
                if(newCategoria && newCategoria.descrizione && newCategoria.nome && newCategoria.prezzo) {
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