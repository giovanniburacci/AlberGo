import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input, Typography, Select, InputNumber, Checkbox, Button, message} from 'antd';
import {StanzaDTO} from '../../../models/models';
import {Key} from 'antd/es/table/interface';
import './newStanza.scss'
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import categorieSelector from '../../../store/categorie/categorie.selector';
import categorieActions from '../../../store/categorie/categorie.action';
import stanzeActions from '../../../store/stanze/stanze.action';
import hotelSelector from '../../../store/hotel/hotel.selector';
import stanzeSelector from '../../../store/stanze/stanze.selector';
import {ArgsProps} from 'antd/es/message';

const componentClassName = 'NewStanza';

interface NewStanzaProps {
    closeDrawer: () => void
}

const NewStanza = (props: NewStanzaProps) => {

    const {closeDrawer} = props;
    const {Title} = Typography;
    const {Option} = Select;
    const dispatch = useDispatch();
    const [newStanza,setNewStanza] = useState<Partial<StanzaDTO>>({
        fuoriServizio: false
    });
    const [hasClickedOnConfirm, setHasClickedOnConfirm] = useState<boolean>(false);
    const categorie = useSelector(categorieSelector.getCategorie);
    const isLoadingCategorie = useSelector(categorieSelector.getIsLoading);
    const isErrorCategorie = useSelector(categorieSelector.getIsError);
    const idHotel = useSelector(hotelSelector.getHotelId);

    const isLoading = useSelector(stanzeSelector.getIsLoadingCreate);
    const isError = useSelector(stanzeSelector.getIsErrorCreate);
    useEffect(() => {
        if(isLoading && hasClickedOnConfirm) {
            message.destroy('success');
            message.destroy('error');
            message.loading({
                duration: 3,
                key: 'loading',
                content: 'Sto creando la stanza...'
            } as ArgsProps);
        }
        else if(isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('success');
            message.error({
                duration: 3,
                key: 'error',
                content: 'Errore nella creazione della stanza!'
            } as ArgsProps);
        }
        else if(!isLoading && !isError && hasClickedOnConfirm) {
            message.destroy('loading');
            message.destroy('error');
            message.success({
                duration: 3,
                key: 'success',
                content: 'Stanza creata con successo!'
            } as ArgsProps);
        }
    }, [isLoading, isError])

    useEffect(() => {
        dispatch(categorieActions.fetchCategorie(idHotel))
    }, [])

    const changeNumeroStanza = (value:Key) => {
        const newNumero = Number(value);
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
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newStanza.numeroStanza) ? 'error-input' : ''}`}>
                <Title level={5}>Numero Stanza</Title>
                <InputNumber placeholder={'Numero stanza'} className={`${componentClassName}__inputgroup__input`} onChange={changeNumeroStanza} min={0}/>
            </div>
            <div className={`${componentClassName}__inputgroup`}>
                <Title level={5}>Fuori servizio</Title>
                <Checkbox onChange={changeFuoriServizio}>La stanza è attualmente fuori servizio</Checkbox>
            </div>

            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newStanza.idCategoria) ? 'error-input' : ''}`}>
                <Title level={5}>Categoria</Title>
                <Select
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Categoria"
                    optionFilterProp="children"
                    value={(newStanza && newStanza.idCategoria) && newStanza.idCategoria}
                    onChange={changeCategoria}
                    aria-placeholder={'Categoria'}
                    filterOption={(input, option) =>
                        option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    id={'select_categoria'}
                    disabled={isLoadingCategorie || isErrorCategorie}
                >
                    {
                        (categorie && categorie.length > 0) &&
                        categorie.map((categoria) => (
                            <Option key={categoria.id} value={categoria.id}>{categoria.nome}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newStanza.metriQuadri) ? 'error-input' : ''}`}>
                <Title level={5}>Metri quadri</Title>
                <InputNumber placeholder={'Metri quadri'} className={`${componentClassName}__inputgroup__input`} onChange={changeMetriQuadri} min={0}/>
            </div>
            <div className={`${componentClassName}__inputgroup ${(hasClickedOnConfirm && !newStanza.descrizione) ? 'error-input' : ''}`}>
                <Title level={5}>
                    Descrizione
                </Title>
                <Input placeholder="Descrizione" onChange={changeDescrizione} value={(newStanza && newStanza.descrizione) && newStanza.descrizione}/>
            </div>
            <Button onClick={() => {
                setHasClickedOnConfirm(true);
                if(newStanza && newStanza.numeroStanza && newStanza.descrizione && newStanza.idCategoria && newStanza.metriQuadri) {
                    closeDrawer();
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