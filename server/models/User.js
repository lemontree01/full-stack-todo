const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    todos: [{
        type: ObjectId,
        ref: 'Todo',
        default: []
    }]
})

module.exports = model('User', User)