const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    userIP : String
}, {
    versionKey: false,
    timestamps: true
})

const UserModals = mongoose.model('User', UserSchema)

module.exports = { UserModals }