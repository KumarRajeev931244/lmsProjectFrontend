import axios from 'axios'

const BASE_URL = 'http://localhost:9000/api/v1/users';
const axiosInstance = axios.create()

console.log(axiosInstance.defaults.baseURL = BASE_URL);
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true

export default axiosInstance;