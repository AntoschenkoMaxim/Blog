const ApiError = require('../exceptions/api-error')

module.exports = function (err, req, res, next) { //first param - err
	console.log(err)
	if (err instanceof ApiError) {//checking if object err instance class ApiError
		return res.status(err.status).json({ message: err.message, errors: err.errors }) //return the response status and call json and pass the params
	}
	return res.status(500).json({ message: 'Internal Server Error' })
}