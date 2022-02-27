const {Schema, model, ObjectId} = require('mongoose')

const Todo = new Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    isDone: {
        type: Boolean,
        default: false
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
})

module.exports = model('Todo', Todo)