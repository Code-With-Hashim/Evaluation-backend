const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { UserModals } = require("../modals/User.modals")
const { ipMiddleware } = require("../middlwares/Authentication.middleware")

const UserRoutes = express.Router()
const saltRounds = 5

UserRoutes.post("/signup", ipMiddleware , async (req, res) => {
    const { email, password, name, age  , userIP} = req.body

    try {

        const existingUser = await UserModals.findOne({ email })

        if (existingUser) {

            res.status(404).send({ msg: 'User Already Exist' })
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    res.status(404).send({ msg: 'Something went wrong Please try again' })
                } else {
                    await UserModals.create({ email, password: hash, name, age , userIP })
                    res.status(200).send({ msg: "User Account Created Successfully" })
                }
            });
        }

    } catch (error) {
        res.status(404).send({ msg: 'Something went wrong Please try again' })
    }

})


UserRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {

        const existingUser = await UserModals.findOne({ email })

        if (existingUser) {

            const token = jwt.sign({ UserID: existingUser._id }, process.env.SECRET_KEY);

            bcrypt.compare(password, existingUser.password, function (err, result) {
                if (result) {
                    res.status(200).send({ msg: 'Successfully Login', token })
                } else {
                    res.status(401).send('Something went wrong please try again')
                }
            });
        }

    } catch (error) {
        res.status(404).send({ msg: 'Something went wrong Please try again' })
    }

})



module.exports = { UserRoutes }
