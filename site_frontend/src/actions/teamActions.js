import axiosInstance from '../axiosApi';

const teamSuccess = (payload) => ({ type: 'FETCH_TEAM_SUCCESS', payload})

const teamInviteSuccess = () => ({})

export const teamError = (error) => ({ type: 'FETCH_TEAM_FAILURE', error})

export const getTeam = () => async dispatch => {
    try{
        const res = await axiosInstance.get('/api/core/get_team/')
        dispatch(teamSuccess(res.data))
    } catch(error){
        teamError(error.message)
    }
}




export const removeTeamMember = (memberId) => async dispatch => {
    try{
        const res = await axiosInstance.post('/api/core/remove-from-team/', {
            id: memberId
        });
        dispatch(teamSuccess(res.data))

    }catch(error){
        dispatch(teamError(error.message))
    }
}


export const asignCaptain = (memberId) => async dispatch => {
    try{
        const res = await axiosInstance.post('/api/core/asign-cap/', {
            id: memberId
        });
        dispatch(teamSuccess(res.data))
    }catch(error){
        dispatch(teamError(error.Message))
    }
}


export const inviteMember = (memberId) => async dispatch => {
    try{
        const res = await axiosInstance.post('/api/core/invite-member/', {
            id: memberId
        });
        dispatch(teamSuccess(res.data))
    }catch(error){
        dispatch(teamError(error.Message))
    }
}