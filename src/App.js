import React, {useEffect} from 'react'
import {useRouter} from "./hooks/router";
import {BrowserRouter as Router} from "react-router-dom";
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {initialize} from "./state/appReducer";

const App = () => {
    const isAuth = useSelector((state) => state.app.isAuth)
    const routs = useRouter(isAuth)
    const dispatch = useDispatch()
    let data = JSON.parse(localStorage.getItem('userData'))
    useEffect(()=>{
        if(data?.token){
            dispatch(initialize({
                isAuth: true
            }))
        }else{
            dispatch(initialize({
                isAuth: false
            }))
        }
    },[])

    return (
        <div className={'App'}>
            <Router>{routs}</Router>
        </div>
    )
}


export default App