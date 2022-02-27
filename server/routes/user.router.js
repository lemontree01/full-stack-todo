const Router = require('express')
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userRouter = new Router()

userRouter.post('/registration', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.get('/', authMiddleware, UserController.auth)

module.exports = userRouter