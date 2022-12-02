const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization //getting authorization token
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError()) //passing unauthorized error
		}

		const accessToken = authorizationHeader.split(' ')[1] //getting access token
		if (!accessToken) {
			return next(ApiError.UnauthorizedError()) //passing unauthorized error
		}

		const userData = tokenService.validateAccessToken(accessToken) //validate access token
		if (!userData) {
			return next(ApiError.UnauthorizedError()) //passing unauthorized error
		}

		req.user = userData
		next()
	} catch (error) {
		return next(ApiError.UnauthorizedError()) //passing unauthorized error
	}
}