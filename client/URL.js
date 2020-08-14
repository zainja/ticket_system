import axios from 'axios'

const API = axios.create({
    baseURL: "https://ticket-system-8888.herokuapp.com/"
})
export default API