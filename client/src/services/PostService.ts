import { AxiosResponse } from 'axios'
import $api from '../http'
import { IPost } from '../models/IPost'
import { ICreatePostForm } from '../models/request/ICreatePostForm'
import { PostResponse } from '../models/response/PostResponse'

export default class PostService {
  //create post function
  static async createPost(postData: ICreatePostForm): Promise<AxiosResponse<PostResponse>> {
    return $api.post<PostResponse>('/create', { postData })
  }

  //delete post function
  static async deletePostByID(_id: string): Promise<AxiosResponse<IPost[]>> {
    return $api.delete<IPost[]>(`/delete/:${_id}`)
  }

  //get posts function(complete)
  static fetchPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>('/posts')
  }
}
