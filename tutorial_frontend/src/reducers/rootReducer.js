import {combineReducers} from 'redux';
import socketReducer from './socketReducer';
import userReducer from './userReducer';



const rootReducer = combineReducers({
    socketReducer,
    userReducer
})

export default rootReducer;