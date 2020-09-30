import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainFrame from './MainFrameComponents/MainFrame';


class App extends React.Component{

    render(){
        return(
            <MainFrame/>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        userReducer: state.userReducer
    }
}


export default connect(mapStateToProps)(App);

/*
const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () =>(
  <Provider store={store}>
    <BrowserRouter>
      <Appp/>
    </BrowserRouter>
  </Provider>
)

store.subscribe(() => console.log("состояние", store.getState()))


export default App;
*/


// connect подключается к redux, извлекает все данные и через mapStateToProps передает все нам
// так как только мы знаем форму нашего state, в mapStateToProps мы возвращаем объект
// с необходимыми компоненту данными в виде props.
// вызов connect(mapStateToProps) вернет новую функцию, получится "новая функция(GameList)", где GameList становится аргументом
// это происходит потому что connect - функция высшего порядка и возвращает функцию

//export default connect(mapStateToProps)(GameList);


/*
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => response, 
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refresh_token = localStorage.getItem('refresh_token');
            return axiosInstance
                .post('/core/api/token/refresh/', {refresh: refresh_token})
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);

                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
                    originalRequest.headers['Authorization'] = 'JWT ' +  response.data.access;
                    return axiosInstance(originalRequest)
                })
                .catch(err => {
                    console.log(err)
                });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; */