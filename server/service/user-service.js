// create, delete, search
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error')

class UserService {
	async registration(email, password, firstName, lastName, location) {
		const candidate = await UserModel.findOne({ email }) //check if candidate have an account
		if (candidate) {
			throw ApiError.BadRequestError(`This user: ${email} already been declarated!`)
		}
		const hashPassword = await bcrypt.hash(password, 3) //hashing the password
		const activationLink = uuid.v4() //creating an activation link

		const user = await UserModel.create({ email, password: hashPassword, firstName, lastName, location, activationLink }) //adding a new user to the database
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`) //sendind activation link to the mail

		const userDto = new UserDto(user) //creating a model (id, email, isActivated)
		const tokens = tokenService.generateTokens({ ...userDto }) //generating the tokens

		await tokenService.saveToken(userDto.id, tokens.refreshToken) //saving refresh token and user id to the database

		return { //return tokens and information about user
			...tokens,
			user: userDto
		}
	}

	async activateAccount(activationLink) {
		const user = await UserModel.findOne({ activationLink }) //searching user by activation link
		if (!user) {
			throw ApiError.BadRequestError('Uncorrect activation link!')
		}
		user.isActivated = true; //change state
		await user.save() //save updated user
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email }) //looking for user with this email in database
		if (!user) {
			throw ApiError.BadRequestError('User with this email was not found')
		}

		const isPasswordEquals = await bcrypt.compare(password, user.password)
		if (!isPasswordEquals) {
			throw ApiError.BadRequestError('Invalid password')
		}

		const userDto = new UserDto(user) //creating a model (id, email, isActivated)
		const tokens = tokenService.generateTokens({ ...userDto }) //generating the tokens

		await tokenService.saveToken(userDto.id, tokens.refreshToken) //saving refresh token and user id to the database

		return { //return tokens and information about user
			...tokens,
			user: userDto
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)//validate token
		const tokenFromDb = await tokenService.findToken(refreshToken)//calling the function that is looking for a token
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await UserModel.findById(userData.id) //looking for user by id, because the information could have changed
		const userDto = new UserDto(user) //creating a model (id, email, isActivated)
		const tokens = tokenService.generateTokens({ ...userDto }) //generating the tokens

		await tokenService.saveToken(userDto.id, tokens.refreshToken) //saving refresh token and user id to the database

		return { //return tokens and information about user
			...tokens,
			user: userDto
		}
	}

	async getAllUsers() {
		const users = await UserModel.find() //looking for all users in database
		return users;
	}
}

module.exports = new UserService()