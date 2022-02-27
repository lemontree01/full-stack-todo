const Router = require('express')
const userRouter = require("./user.router");
const todoRouter = require("./todo.router");
const router = new Router()

router.use('/api/user', userRouter)
router.use('/api/todo', todoRouter)

module.exports = router