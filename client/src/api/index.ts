import axios from "axios"

const baseURL = 'http://localhost:5000/api/'

const axiosInstance = axios.create({
    baseURL
})

// axiosInstance.interceptors.request.use( config => {
//     config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// })

export default axiosInstance