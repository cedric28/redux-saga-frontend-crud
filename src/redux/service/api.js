import axios from 'axios';

const httpClient = params => {
    return axios.request({
        ...params,
        baseURL: 'http://localhost:3001/api'
    });
}


export { httpClient };