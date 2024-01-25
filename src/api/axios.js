import axios from "axios";

const instance = axios.create({
    baseURL: 'https://valkiria-backend-felipe-dulceys-projects.vercel.app/api',
    withCredentials: true,
})

export default instance;