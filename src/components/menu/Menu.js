import React from 'react'
import css from './menu.module.css'
import logo from '../../img/sibdev-logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {initialize} from "../../state/appReducer";
import { Modal } from 'antd';

const {confirm} = Modal
const Menu = () => {
    const dispatch = useDispatch()
    const logout = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            icon: null,
            content: '',
            cancelText: 'Отменить',
            okText: 'Да',
            onOk() {
                dispatch(initialize({
                    isAuth: false
                }))
                localStorage.removeItem('userData')
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    return (
        <div className={css.wrapper}>
            <div className={css.first__child}>
                <div className={css.logo_wrapper}><img src={logo} alt="S"/></div>
                <NavLink activeClassName={css.active} to={'/main'}>Поиск</NavLink>
                <NavLink activeClassName={css.active} to={'/saved'}>Избранное</NavLink>
            </div>
            <div>
                <div className={css.logout} onClick={logout}>Выйти</div>
            </div>
        </div>
    )
}


export default Menu