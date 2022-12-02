import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use((config) => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use((config) => {//интерцептор который отслеживает пришел ли ответ с кодом 401, если пришел и есть refreshToken, перезаписываем accessToken
	return config
}, async (error) => {
	const originalRequest = error.config
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true }) //because its a default instance axios
			localStorage.setItem('token', response.data.accessToken)
			return $api.request(originalRequest)
		} catch (error) {
			console.log('Unauthorized')
		}
	}
	throw error
})

export default $api