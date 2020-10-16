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
                error: false,
                user: {...action.payload}
            }
            default:
                return state
    }
}


export default userReducer;