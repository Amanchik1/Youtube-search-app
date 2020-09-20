import React, {useEffect, useState} from 'react'
import css from "./save.module.css";
import {Button, Input, InputNumber, Modal, Select, Slider} from 'antd';
import {useDispatch} from "react-redux";
import {setTextAC} from "../../state/appReducer";
import { useHistory } from 'react-router-dom'
const {Option} = Select;


const SavedPage = () => {
    const [links, setLinks] = useState([])
    useEffect(()=>{
       update()
    },[])
    const update = () => {
        let userData = JSON.parse(localStorage.getItem('userData'))
        console.log(userData)
        setLinks([...userData.links])
    }
    return (
        <div>
            <h1 className={css.text}>Избранное</h1>
            <div className={css.list}>
                {
                    links.map((item, index) => <Request update={update} key={item.req} index={index} req={item.name} />)
                }
            </div>
        </div>
    )
}


const Request = (props) => {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let {req, size, order: filter, name: textName  } = userData?.links[props.index]
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [saveSize, setSaveSize] = useState(12)
    const [order, setOrder] = useState(null)

    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const searchVideo = () => {
        dispatch(setTextAC({
            text: text
        }))
        history.push('/main')
    }

    useEffect(()=>{
        setText(req)
        setName(textName)
        setSaveSize(size)
        setOrder(filter)
    }, [req, size, filter, textName])

    const handleOk = () => {
        let data = {...userData, links: [...userData.links]}
        data.links[props.index] = {
            req: text,
            name: name,
            size: saveSize,
            order: order
        }
        localStorage.setItem('userData', JSON.stringify(data))
        setVisible(false)
        props.update()
    }
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <div className={css.req} >
            <span>{props.req}</span>
            <div>
                <Button onClick={()=> setVisible(true)} className={css.change} type={'dashed'}>Изменить</Button>
                <Button onClick={searchVideo} type="primary" ghost>
                    Выполнить
                </Button>
            </div>
            <Modal
                title="Изменить запрос"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Сохранить'}
                cancelText={'Не сохранять'}
            >
                <div className={css.modal}>
                    <Input value={text}
                           onChange={(e)=> setText(e.target.value)}
                    />
                    <Input placeholder={'Укажите нозвания'} value={name} onChange={(e) => setName(e.target.value)}/>
                    <Select placeholder={'Сортировать по'} value={order} onChange={(e) => setOrder(e)}>
                        <Option value="date">Дате</Option>
                        <Option value="rating">Рейтингу</Option>
                        <Option value="relevance">Акуальности</Option>
                        <Option value="title">Заглавие</Option>
                    </Select>
                    <label>
                        <Slider
                            defaultValue={saveSize}
                            max={50}
                            onChange={(e) => setSaveSize(e)}
                            disabled={false}
                        />
                        <InputNumber
                            value={saveSize}
                            disabled={true}
                        />
                    </label>
                </div>
            </Modal>
        </div>
    )
}

export default SavedPage