// import axios from 'axios';

export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('token')

    if (token) {
        return { 'Authorization': 'Bearer ' + token }
    } else {
        return {}
    }

    /* const http = axios.create({
        baseURL: process.env.API_URL + '/api/',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`
    }) */
}
