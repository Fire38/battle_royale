import userReducer from './userReducer'
import gameListReducer from './gameListReducer';
import teamReducer from './teamReducer';
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    userReducer,
    gameListReducer,
    teamReducer
})

export default rootReducer