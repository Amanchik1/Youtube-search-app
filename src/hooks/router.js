import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import Menu from "../components/menu/Menu";
import SearchPage from "../components/searchPage/searchPage";
import SavedPage from "../components/savedPage/savedPage";

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
                        <Route path={'/saved'}>
                            <SavedPage />
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