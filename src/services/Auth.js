/* eslint-disable no-useless-catch */
import Client from './api'

export const SignInUser = async (data) => {
    try {
        const res = await Client.post('/auth/login', data)
        // Set the current signed in users token to localStorage
        localStorage.setItem('token', res.data.token)
        return res.data.user
    } catch (error) {
        throw error
    }
}

export const RegisterUser = async (data) => {
    try {
        const res = await Client.post('/auth/register', data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const UpdateUser = async (data) => {
    try {
        const res = await Client.post('/auth/update-password', data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const CheckSession = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    try {
        // Checks if the current token if it exists is valid
        const res = await Client.get('/auth/session', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        throw error
    }
}