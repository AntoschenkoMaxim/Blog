const postService = require('../service/post-service')
const { validationResult } = require('express-validator') //getting the result of validation
const ApiError = require('../exceptions/api-error')

class PostController {
	async createPost(req, res, next) {
		try {

			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return ApiError.BadRequestError('Validation error', errors.array())
			}
			const { title, description, location } = req.body.postData
			// const { id, email, firstName, lastName } = req.body.postData.author

			const postData = await postService.createPost(title, description, location) //comments, createdBy, image, date
			return res.json(postData)
		} catch (error) {
			next(error)
		}
	}

	async deletePostByID(req, res, next) {
		try {
			const postID = req.params.id
			const result = await postService.deletePostByID(postID)
			return result
		} catch (error) {
			next(error)
		}
	}

	async getPosts(req, res, next) {
		try {
			const posts = await postService.getAllPosts() //getting posts by calling the getAllPosts function
			return res.json(posts) //return json
		} catch (error) {
			next(error)//calling middleware
		}
	}

	// async updatePost(req, res, next) {
	// 	try {

	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

}

module.exports = new PostController()