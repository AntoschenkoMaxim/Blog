const PostModel = require('../models/post-model')
const PostDto = require('../dtos/post-dto');

class PostService {

	async createPost(title, description, location) { //id, email, firstName, lastName
		const post = await PostModel.create({ title, description, location })

		const postDto = new PostDto(post)

		return { post: postDto }
	}

	async deletePostByID(id) {
		const result = await PostModel.deleteOne({ id })
		console.log(result)
		return result
	}

	async getAllPosts() {
		const posts = await PostModel.find()
		return posts
	}

}

module.exports = new PostService()