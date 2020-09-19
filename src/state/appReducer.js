
const INITIALIZE = "app/INITIALIZE"

const initialState = {
    isAuth: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type){
        case INITIALIZE:
            return {
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