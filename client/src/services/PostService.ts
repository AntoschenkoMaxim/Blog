import { AxiosResponse } from 'axios'
import $api from '../http'
import { IPost } from '../models/IPost'
import { PostResponse } from '../models/response/PostResponse'


export default class PostService {
	//create post function
	static async createPost(title: string, description: string, location: string): Promise<AxiosResponse<PostResponse>> {
		return $api.post<PostResponse>('/create', { title, description, location })
	}
	//get posts function(complete)
	static fetchPosts(): Promise<AxiosResponse<IPost[]>> {
		return $api.get<IPost[]>('/posts')
	}
}