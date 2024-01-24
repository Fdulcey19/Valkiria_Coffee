import axios from "axios";

// baseURL: 'http://localhost:3000/api',
// baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',

const instance = axios.create({
    baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
    withCredentials: true,
})

export default instance;