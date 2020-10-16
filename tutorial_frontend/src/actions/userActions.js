import axiosInstance from '../axiosApi';


const setUser = (payload) => ({ type: 'SET_USER', payload })


export const autoLogin = () => async dispatch => {
    try{
        const res = await axiosInstance.get('api/core/get_user/')
        dispatch(setUser(res))
    }catch(error){
        console.log('autoLogin', error)
    }
}