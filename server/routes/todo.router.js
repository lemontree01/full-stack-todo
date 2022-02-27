const Router = require('express')

const authMiddleware = require("../middleware/auth.middleware");
const TodoController = require("../controllers/todo.controller");
const todoRouter = new Router()

todoRouter.post('/create', authMiddleware, TodoController.create)
todoRouter.get('/', authMiddleware, TodoController.getTodos)
todoRouter.post('/modify', authMiddleware, TodoController.modifyName)
todoRouter.post('/setisdone', authMiddleware, TodoController.setIsDone)
todoRouter.delete("/", authMiddleware, TodoController.deleteTodo)


module.exports = todoRouter