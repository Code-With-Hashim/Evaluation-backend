const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    taskname : String,
    status : String,
    tag : String,
    UserID : String
}, {
    versionKey: false,
    timestamps: true
})

const TodoModals = mongoose.model('Todo', TodoSchema)

module.exports = { TodoModals }