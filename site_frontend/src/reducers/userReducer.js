const defaultState = {
    loggedIn: false,
    error: false,
    errorMessage: '',
    user: {}
}


const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                loggedIn: true,
                loading: false,
                error: false,
                user: {...action.payload}
            }
        case 'LOG_OUT':
            localStorage.clear()
            return {
                ...state,
                loggedIn: false,
                user: {}
            }
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export default userReducer