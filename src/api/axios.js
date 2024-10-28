import axios from "axios";

// baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
const instance = axios.create({
    baseURL: 'https://valkiria-backend.vercel.app/api/',
})

export default instance;