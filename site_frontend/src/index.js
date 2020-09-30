import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import App from './components/App';

const store = createStore(rootReducer, applyMiddleware(thunk))

const Index = () =>(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

store.subscribe(() => console.log('состояние', store.getState()))



ReactDOM.render(<Index/>, document.getElementById("app"))