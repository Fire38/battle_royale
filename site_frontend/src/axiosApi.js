import axios from 'axios';

const baseURL = 'http://192.168.88.247:8000/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token'), 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

/*
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/core/token/refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    // console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('api/core/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
            
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);
            
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/login/';
                }
        }
      
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
); 


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return new Promise((resolve, reject) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && error.config && !error.config.__isRetryRequest){
                originalRequest._retry = true;
                console.log('tut')
                let res = axiosInstance.post('api/core/token/refresh/', {refresh: localStorage.getItem('refresh_token')})
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
    
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                    originalRequest.headers['Authorization'] = "JWT " + response.data.access;
                    return axiosInstance(originalRequest)
                    resolve(res);
                })
            }
            return Promise.reject(error)
        })
    }
) 

import createAuthRefreshInterceptor from 'axios-auth-refresh';

function getAccessToken(){
    return localStorage
}

const refreshAuthLogic = failedRequest => axiosInstance.post('api/core/token/refresh/', {refresh: localStorage.getItem('refresh_token')})
.then((response) => {

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
    console.log(failedRequest.response.config.url)
    failedRequest.response.config.headers['Authorization'] = 'JWT ' + response.data.access
    return Promise.resolve();
})

const AxiosAuthRefreshOptions = {
    //pauseInstanceWhileRefreshing: true,
    retryInstance: axiosInstance,
    //skipAuthRefresh: true
}

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, AxiosAuthRefreshOptions)
*/


//https://github.com/axios/axios/issues/266
axiosInstance.interceptors.response.use(function(response) {
    return response;
}, function (error){
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh_token')
        return axiosInstance.post('api/core/token/refresh/', {refresh: refreshToken})
        .then(({data}) => {
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + data.access
            originalRequest.headers['Authorization'] = 'JWT ' + data.access
            return (axiosInstance(originalRequest))
        })
    }
    return Promise.reject(error)
})



export default axiosInstance
