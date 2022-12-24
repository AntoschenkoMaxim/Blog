const Router = require('express').Router
const postController = require('../controllers/post-controller')
const userController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator') //validation of the request body
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
	body('*.email').isEmail(), //validation of the email field
	body('*.password').isLength({ min: 3, max: 32 }),
	userController.registration
)
// * needed for object validation
router.post('/login',
	body('*.email').isEmail(),
	body('*.password').isLength({ min: 3, max: 32 }),
	userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers) //check if the user is logged in

router.post('/create', authMiddleware, postController.createPost) //check if the user is logged in 
router.get('/posts', postController.getPosts)
router.get('/delete/:id', postController.deletePostByID)

module.exports = router