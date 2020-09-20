import React, {useEffect, useState} from 'react'
import css from './search.module.css'
import api, {video} from '../../api'
import {Input, Modal, Slider, Select, InputNumber} from 'antd';
import {useSelector} from "react-redux";

const {Option} = Select;

const SearchPage = () => {
    const savedText = useSelector((state) => state.app.text)
    const [text, setText] = useState('')
    const [filterText, setFilterText] = useState('')
    const [data, setData] = useState(null)
    const [saved, setSaved] = useState(false)
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [saveSize, setSaveSize] = useState(12)
    const [order, setOrder] = useState(null)

    const [filter, setFilter] = useState(false)

    let userData = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        setText(savedText)
        if (savedText.length) {
            Search(null, savedText)
            setSaved(true)
            setFilterText(savedText)
        }
    }, [savedText])
    const request = (count = 12, order = null, str) => {
        let text2 = str ? str : text
        api.get('search', {
            params: {
                maxResults: count,
                q: text2,
                order: order ? order : null
            }
        }).then((res) => {
            const result = res.data.items
            setFilterText(text2)
            setData(result)
        }, (error) => {
            alert(error.message)
        })
    }
    const Search = (e, str) => {
        if (e) {
            e.preventDefault()
        }

        let count = 12
        let order = null
        let i = 0
        userData.links.forEach((item) => {
            if (item.req === text) {
                i++
                setOrder(item.order)
                count = item.size
                order = item.order
                setSaved(true)
            }else if(item.req === str){
                i++
                setOrder(item.order)
                count = item.size
                order = item.order
                setSaved(true)
            }
        })
        request(count, order, str)
        if (i === 0) {
            setSaved(false)
        }
    }
    const onSave = () => {
        if (text.length) {
            setVisible(true)
        }
    }
    const onRemove = () => {
        let data = {...userData, links: [...userData.links]}
        data.links.forEach((item, index) => {
            if (item.req === text) {
                data.links.splice(index, 1)
            }
        })
        localStorage.setItem('userData', JSON.stringify({...data}))
        setSaved(false)
    }
    const handleOk = () => {
        setSaved(!saved)
        localStorage.setItem('userData', JSON.stringify({
            ...userData,
            links: [...userData.links, {
                req: text,
                name: name,
                size: saveSize,
                order: order
            }]
        }))
        setVisible(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <div>
            <h1 className={css.text}>Поиск видео</h1>
            <form onSubmit={Search} className={css.searchWrapper}>
                <span>
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder={'Что хотите посмотреть?'}
                           type="text"/>
                    {
                        saved
                            ? <svg onClick={onRemove} className={css.heart} width="24" height="22" viewBox="0 0 24 22"
                                   fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999Z"
                                    fill="#C5E4F9" stroke="#1390E5" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            : <svg onClick={onSave} className={css.heart} width="24" height="22" viewBox="0 0 24 22"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z"
                                    stroke="#1390E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    }
                </span>
                <button>Search</button>
            </form>
            <div className={css.filterWrapper}>
                <h3 className={css.filterBy}>Видео по запросу « <span>{filterText}</span> »</h3>
                <div className={css.filters}>
                    <svg onClick={() => setFilter(false)} className={css.row} width="24" height="24" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity={!filter ? "1" : "0.3"}>
                            <path d="M8 6H21" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8 12H21" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8 18H21" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3 6H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3 12H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3 18H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <svg onClick={() => setFilter(true)} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g opacity={filter ? "1" : "0.3"}>
                            <path d="M10 5H5V10H10V5Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M19 5H14V10H19V5Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M19 14H14V19H19V14Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M10 14H5V19H10V14Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>


                </div>
            </div>
            <div className={filter ? css.videos : css.videosList + ' ' + css.videos}>
                {
                    data?.map((item) => {
                        return <Video
                            key={item.id.videoId}
                            filter={filter}
                            id={item.id.videoId}
                            title={item.snippet.title}
                            chanalName={item.snippet.channelTitle}
                        />
                    })
                }
            </div>
            <Modal
                title="Сохранить запрос"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Сохранить'}
                cancelText={'Не сохранять'}
            >
                <div className={css.modal}>
                    <Input value={text} disabled={true}/>
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

const Video = (props) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        video.get('/videos', {
            params: {
                id: props.id
            }
        }).then((res) => {
            setData(res.data.items[0].statistics)
        })
    }, [])
    return (
        <div className={!props.filter ? css.list : ''}>
            <iframe title={'youtube'} frameBorder={0} src={'https://www.youtube.com/embed/' + props.id}
                    width={'300px'}/>
            <div>
                <div className={css.video__title} title={props.title}>{props.title}</div>
                <div className={css.infoWrapper}>
                    <div className={css.channel}>{props.chanalName}</div>
                    <div>{data?.viewCount} просмотров</div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage