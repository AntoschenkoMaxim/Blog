import $api from '../http';
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
	//login function
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> { //what data will this function return
		return $api.post<AuthResponse>('/login', { email, password }) //the generic is needed to see the fields
	}

	//registration function
	static async registration(email: string, password: string, firstName: string, lastName: string, location: string): Promise<AxiosResponse<AuthResponse>> { //what data will this function return
		return $api.post<AuthResponse>('/registration', { email, password, firstName, lastName, location }) //the generic is needed to see the fields
	}

	//logout function 
	static async logout(): Promise<void> { //what data will this function return
		return $api.post('/logout')
	}
}