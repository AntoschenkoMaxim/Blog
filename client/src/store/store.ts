import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'
import PostService from '../services/PostService'
import { IPost } from '../models/IPost'
import { ICreatePostForm } from '../models/request/ICreatePostForm'
import { IRegistrationForm } from '../models/request/IRegistrationForm'
import { ILoginForm } from '../models/request/ILoginForm'

export default class Store {
  user = {} as IUser //save data about user
  post = {} as IPost
  posts = [] as IPost[]
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool //change isAuth
  }

  setUser(user: IUser) {
    this.user = user //change user
  }

  setPost(post: IPost) {
    this.post = post //change post
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(userData: ILoginForm) {
    try {
      const response = await AuthService.login(userData)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken) //save accessToken in localStorage
      this.setAuth(true) //change isAuth
      this.setUser(response.data.user) //set user
    } catch (error) {
      console.log(error)
    }
  }

  async registration(userData: IRegistrationForm) {
    try {
      const response = await AuthService.registration(userData)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken) //save accessToken in localStorage
      this.setAuth(true) //change isAuth
      this.setUser(response.data.user) //set user
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token') //save accessToken in localStorage
      this.setAuth(false) //change isAuth
      this.setUser({} as IUser)
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth() {
    this.setLoading(true) //loader
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      }) //because its a default instance axios
      console.log(response)
      localStorage.setItem('token', response.data.accessToken) //save accessToken in localStorage
      this.setAuth(true) //change isAuth
      this.setUser(response.data.user) //set user
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }

  async createPost(postData: ICreatePostForm) {
    try {
      const response = await PostService.createPost(postData)
      console.log(response)
      this.setPost(response.data.post) //set post
      this.posts.push(this.post)
    } catch (error) {
      console.log(error)
    }
  }

  async deletePostByID(id: string) {
    try {
      // const response = await PostService.deletePostByID(_id)
      // console.log(response)
      this.posts = this.posts.filter((item) => item.id !== id)
    } catch (error) {
      console.log(error)
    }
  }
}
