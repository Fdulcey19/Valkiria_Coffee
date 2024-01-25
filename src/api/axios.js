import axios from "axios";

// baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
// baseURL: 'http://localhost:3000/api',

const instance = axios.create({
    baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
    withCredentials: true,
})

export default instance;