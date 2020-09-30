import axiosInstance from '../axiosApi';

const gameListSuccess = (payload) => ({ type: 'FETCH_GAMES_SUCCESS', payload})

export const gameListError = () => ({ type: 'FETCH_GAMES_FAILURE', error})



export const getGameList = () => async dispatch => {
    try{
        const res = await axiosInstance.get('/api/core/get_game_list/')
        console.log('otvet',res.data)
        dispatch(gameListSuccess(res.data))
    } catch(error){
        gameListError(error.message)
        console.log(error)
    }
}