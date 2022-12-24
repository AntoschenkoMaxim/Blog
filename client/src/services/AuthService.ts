import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { IRegistrationForm } from '../models/request/IRegistrationForm'
import { ILoginForm } from '../models/request/ILoginForm'

export default class AuthService {
  //login function
  static async login(userData: ILoginForm): Promise<AxiosResponse<AuthResponse>> {
    //what data will this function return
    return $api.post<AuthResponse>('/login', { userData }) //the generic is needed to see the fields
  }

  //registration function
  static async registration(userData: IRegistrationForm): Promise<AxiosResponse<AuthResponse>> {
    //what data will this function return
    return $api.post<AuthResponse>('/registration', { userData }) //the generic is needed to see the fields
  }

  //logout function
  static async logout(): Promise<void> {
    //what data will this function return
    return $api.post('/logout')
  }
}
