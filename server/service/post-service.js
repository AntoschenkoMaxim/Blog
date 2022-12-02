const PostModel = require('../models/post-model')
const PostDto = require('../dtos/post-dto');

class PostService {

	async createPost(title, description, location) {
		const post = await PostModel.create({ title, description, location })

		const postDto = new PostDto(post)

		return { post: postDto }
	}

	async getAllPosts() {
		const posts = await PostModel.find()
		return posts
	}
}

module.exports = new PostService()