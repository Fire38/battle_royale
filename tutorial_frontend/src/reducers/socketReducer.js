const defaultState = {
    connected: false,
    message: 'please wait'
}


const socketReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SOCKET_CONNECTING':
            return {
                ...state,
                message: 'Connected',
                connected: true
            }
        case 'SOCKET_DISCONNECTING':
            return {
                ...state,
                message: 'Disconnecting',
                connected: false
            }
        case 'SOCKET_MESSAGE_SENDING':
            return {
                ...state,
                message: 'Send message',
                connected: true
            }
        case 'SOCKET_MESSAGE_RECEIVING':
            return {
                ...state,
                message: 'Message receive',
                connected: true
            }
        default:
            return state
    }
}

export default socketReducer