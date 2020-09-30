const defaultState = {
    error: false,
    errorMessage: '',
    success: false,
    successMessage: '',
    team: {}
}


const teamReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'FETCH_TEAM_SUCCESS':
            return {
                ...state,
                error: false,
                team: {...action.payload}
            }
        case 'FETCH_TEAM_FAILURE':
            return {
                ...state,
                error: true,
                errorMessage: action.error,
            }
        default:
            return state
    }
}

export default teamReducer