import axios from 'axios'

export const BASE_URL = 'https://walk-and-sketch-server-804e174b4a0c.herokuapp.com/'

const Client = axios.create({baseURL: BASE_URL})

export default Client