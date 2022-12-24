const userService = require('../service/user-service')
const { validationResult } = require('express-validator') //getting the result of validation
const ApiError = require('../exceptions/api-error')

class UserController {
	//
	async registration(req, res, next) {
		try {
			const errors = validationResult(req) //getting the errors
			if (!errors.isEmpty()) { //if errors is not empty return the validation error and array of errors
				return next(ApiError.BadRequestError('Validation error', errors.array()))
			}
			const { email, password, firstName, lastName, location } = req.body.userData; //getting the email, password, firstName, lastName and location
			const userData = await userService.registration(email, password, firstName, lastName, location); //passing these data to registration function

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) //saving refresh token in cookie
			return res.json(userData); //returning the received json

		} catch (error) {
			next(error)//calling middleware
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body.userData //getting the email and password
			const userData = await userService.login(email, password) //passing these data to login function

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) //saving refresh token in cookie
			return res.json(userData); //returning the received json

		} catch (error) {
			next(error)//calling middleware
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies//getting refresh token from req.cookies
			const token = await userService.logout(refreshToken) //passing refreshToken to logout function
			res.clearCookie('refreshToken')//clear cookie
			return res.json(token)
		} catch (error) {
			next(error)//calling middleware
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link //getting the activation link
			await userService.activateAccount(activationLink) //passing the link to the activate function
			return res.redirect(process.env.CLIENT_URL) //redirect to personal account
		} catch (error) {
			next(error)//calling middleware
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken) //passing these data to login function
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) //saving refresh token in cookie
			return res.json(userData); //returning the received json
		} catch (error) {
			next(error)//calling middleware
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers() //getting users by calling the getallusers function
			return res.json(users) //return json
		} catch (error) {
			next(error)//calling middleware
		}
	}
}

module.exports = new UserController()