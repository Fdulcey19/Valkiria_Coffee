import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
    baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app',
    withCredentials: true,
})

export default instance;