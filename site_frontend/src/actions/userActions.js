import axiosInstance from '../axiosApi';


const setUser = (payload) => ({ type: 'SET_USER', payload })

export const loginError = (error) => ({ type: 'ERROR', error})

export const logUserOut = () => ({ type: 'LOG_OUT' })

/*
export const fetchUser = (userInfo) => dispatch => {
    fetch('http://127.0.0.1:8000/api/core/token/obtain/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data =>{
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        dispatch(setUser(data))
    })
} */


export const fetchUser = (userInfo) => async dispatch => {
    try{
        const res = await axiosInstance.post('/api/core/token/obtain/', {
            username: userInfo.username,
            password: userInfo.password
        });
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        dispatch(autoLogin())
        return res

    } catch (error) {
        console.log(error.message)
        dispatch(loginError(error.message))
    }
} 



export const registerUser = (userInfo) => async dispatch => {
    try{
        const res = await axiosInstance.post('api/core/user/create/', {
            username: userInfo.username,
            password: userInfo.password,
        });
        if (res.status === 201){
            const res = await axiosInstance.post('api/core/token/obtain/', {
                username: userInfo.username,
                password: userInfo.password
            });
            console.log('Зарегались', res)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            dispatch(autoLogin())
            return data
        }

    } catch(error){
        console.log('ошибка регистрации!!!!', error)
    }
}


export const autoLogin = () => async dispatch => {
    try{
        const res = await axiosInstance.get('api/core/get_user/', { skipAuthRefresh: true })
        dispatch(setUser(res))
    }catch(error){
        console.log('autologin', error)
    }
}


