import axios from 'axios';

//Setting a basURL for every request that will be made via axios
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default axiosInstance;