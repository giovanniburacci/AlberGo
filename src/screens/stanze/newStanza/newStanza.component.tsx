import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input, Typography, Select, InputNumber, Checkbox, Button} from 'antd';
import {StanzaDTO} from '../../../models/models';
import {Key} from 'antd/es/table/interface';
import './newStanza.scss'
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import categorieSelector from '../../../store/categorie/categorie.selector';
import categorieActions from '../../../store/categorie/categorie.action';
import stanzeActions from '../../../store/stanze/stanze.action';

const componentClassName = 'NewStanza';

const NewStanza = () => {

    const {Title} = Typography;
    const {Option} = Select;
    const dispatch = useDispatch();
    const [newStanza,setNewStanza] = useState<Partial<StanzaDTO>>();
    const categorie = useSelector(categorieSelector.getCategorie);
    const isLoading = useSelector(categorieSelector.getIsLoading);
    const isError = useSelector(categorieSelector.getIsError);

    useEffect(() => {
        dispatch(categorieActions.fetchCategorie(1)) // todo gestire idHotel
    }, [])

    const changeNumeroStanza = (value:Key) => {
        const newNumero = Number(value);
        console.log(newNumero);
        setNewStanza((oldState) => ({
            ...oldState,
            numeroStanza: newNumero
        }))
    }

    const changeFuoriServizio = (value:CheckboxChangeEvent) => {
        if(value.target.checked) {
            setNewStanza((oldState) => ({
                ...oldState,
                fuoriServizio: true
            }))
        } else {
            setNewStanza((oldState) => ({
                ...oldState,
                fuoriServizio: false
            }))
        }
    }

    const changeCategoria = (value:Key) => {
        if(categorie) {

            const newCategoria = categorie.find((categoria) => (categoria.id == value));
            if(newCategoria) {
                setNewStanza((oldStanza) => ({
                    ...oldStanza,
                    idCategoria: newCategoria.id
                }))
            }
        }
    }

    const changeMetriQuadri = (value:Key) => {
        const newMetriQuadri = Number(value);
        setNewStanza((oldState) => ({
            ...oldState,
            metriQuadri: newMetriQuadri
        }))
    }

    const changeDescrizione = (value:ChangeEvent<HTMLInputElement>) => {
        const newDescrizione = value.target.value;
        setNewStanza((oldState) => ({
            ...oldState,
            descrizione: newDescrizione
        }))
    }

    return (
        <div className={`${componentClassName}`}>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Numero Stanza</Title>
                <InputNumber className={`${componentClassName}__inputgroup__input`} onChange={changeNumeroStanza} min={0}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Fuori servizio</Title>
                <Checkbox onChange={changeFuoriServizio}>La stanza è attualmente fuori servizio</Checkbox>
            </div>

            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Categoria</Title>
                <Select
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Categoria"
                    optionFilterProp="children"
                    value={(newStanza && newStanza.idCategoria) && newStanza.idCategoria}
                    onChange={changeCategoria}
                    filterOption={(input, option) =>
                        option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={isLoading || isError}
                >
                    {
                        (categorie && categorie.length > 0) &&
                        categorie.map((categoria) => (
                            <Option key={categoria.id} value={categoria.id}>{categoria.nome}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Metri quadri</Title>
                <InputNumber className={`${componentClassName}__inputgroup__input`} onChange={changeMetriQuadri} min={0}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input placeholder="Descrizione" onChange={changeDescrizione} value={(newStanza && newStanza.descrizione) && newStanza.descrizione}/>
            </div>
            <Button onClick={() => {
                if(newStanza && newStanza.numeroStanza && newStanza.descrizione && newStanza.idCategoria && newStanza.metriQuadri) {
                    console.log('prova')
                    dispatch(stanzeActions.addStanza({
                        ...newStanza,
                        idHotel: 1
                    }))
                }
            }}>Conferma</Button>
        </div>
    )
}
export default  NewStanza;