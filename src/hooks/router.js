import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import Menu from "../components/menu/Menu";
import SearchPage from "../components/searchPage/searchPage";


export const useRouter = (isAuth) => {
    if (isAuth) {
        return (
            <>
                <Menu/>
                <div className='page__wrapper'>
                    <Switch>
                        <Route exact path={'/main'}>
                            <SearchPage />
                        </Route>
                        <Route exact path={'/saved'}>
                            Saved page
                        </Route>
                        <Redirect to={'/main'}/>
                    </Switch>
                </div>
            </>
        )
    }
    return (
        <Switch>
            <Route exact path={'/'}>
                <LoginPage/>
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    )
}