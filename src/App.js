import React  from 'react'
import {useRouter} from "./router";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => {
    const routs = useRouter(true)
    return (
        <div className={'App'}>
            <Router>{routs}</Router>
        </div>
    )
}


export default App