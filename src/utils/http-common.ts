
import axios from 'axios';
import authService from '../services/auth.service';
export const domain = `http://localhost:8000`

export const http = axios.create({
    baseURL: `${domain}/api/v1/user`,
    headers: { 'Content-Type': 'application/json' }
})
http.interceptors.request.use(function (config:any) {
    // Do something before request is sent
    const token = authService.getDecToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  }, function (error:any) {
    // Do something with request error
    return Promise.reject(error);
  })
http.interceptors.response.use(
    function (response:any){
        return Promise.resolve(response);
    },
    function (error:any){
        return error.response;
    }
)