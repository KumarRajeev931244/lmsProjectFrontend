import axios from 'axios'

const BASE_URL = 'http://localhost:5014/api/v1';

const axiosInstance = axios.create();

axiosInstance.defaults.BASE_URL = BASE_URL;
axiosInstance.defaults.withCredentials = true

export default axiosInstance;