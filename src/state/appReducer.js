
const INITIALIZE = "app/INITIALIZE"
const SET_TEXT = "app/SET_TEXT"

const initialState = {
    isAuth: false,
    text: ''
}

export const appReducer = (state = initialState, action) => {
    switch (action.type){
        case INITIALIZE:
            return {
                ...state,
                ...action.payload
            }
        case SET_TEXT:
            return  {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export const initialize = (payload) => {
    return {
        type: INITIALIZE,
        payload
    }
}
export const setTextAC = (payload) => {
    return {
        type: SET_TEXT,
        payload
    }
}