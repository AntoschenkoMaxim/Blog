const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {
	generateTokens(payload) {//function of generating a tokens
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' }) //create access token
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' }) //create refresh token
		return { //return created tokens
			accessToken,
			refreshToken
		}
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)//verify access token
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)//verify refresh token
			return userData
		} catch (error) {
			return null
		}
	}

	async saveToken(userId, refreshToken) { //function of saving a token to a specific user
		const tokenData = await tokenModel.findOne({ user: userId }) //check the availability of a token
		if (tokenData) { //if tokenData have a token
			tokenData.refreshToken = refreshToken //then overwriting the token
			return tokenData.save() //update new refresh token in database
		}

		const token = await tokenModel.create({ user: userId, refreshToken }) //if this is a new user - we create an entry in the database
		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken }) //delete token
		return tokenData;
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken }) //find token in database
		return tokenData;
	}
}

module.exports = new TokenService()