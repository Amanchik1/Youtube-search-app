import {combineReducers, compose, createStore} from "redux";
import {appReducer} from "./appReducer";

let reducers = combineReducers({
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers())


export default store