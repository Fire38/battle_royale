const defaultState = {
    error: false,
    errorMessage: '',
    games: {}
}


const gameListReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'FETCH_GAMES_SUCCESS':
            return {
                ...state,
                games: {...action.payload}
            }
        case 'FETCH_GAMES_FAILURE':
            return {
                ...state,
                error: true,
                errorMessage: action.error,
                games: {}
            }
        default:
            return state
    }
}

export default gameListReducer