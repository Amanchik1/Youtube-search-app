import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./components/login/LoginPage";


export const useRouter = (isAuth) => {
    if(isAuth){
        return (
            <Switch>
                <Route exact path={'/'}>
                    Main page
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route exact path={'/'}>
                <LoginPage />
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    )
}