const express = require('express')

const { TodoModals } = require("../modals/Todo.modals")
const { authentication } = require("../middlwares/Authentication.middleware")

const TodoRoutes = express.Router()
TodoRoutes.use(authentication)

TodoRoutes.post("/create", async (req, res) => {

    const payload = req.body
    console.log(payload)

    try {

        const Todo = new TodoModals(payload)
        await Todo.save()

        res.status(200).send({
            msg: 'Todo Create Successfully'
        })

    } catch (error) {
        res.status(404).send({
            msg: 'Something went wrong Please try again'
        })
    }

})

TodoRoutes.get("/", async (req, res) => {
    const { status, tag } = req.query
    const { UserID } = req.body

    try {

        if (tag) {
            const TodoList = await TodoModals.find({ UserID, tag })
            res.status(200).send(TodoList)
        } else if (status) {
            const TodoList = await TodoModals.find({ UserID, status })
            res.status(200).send(TodoList)
        } else if (tag && status) {
            const TodoList = await TodoModals.find({ UserID, tag, status })
            res.status(200).send(TodoList)
        } else {
            const TodoList = await TodoModals.find({ UserID })
            res.status(200).send(TodoList)
        }


    } catch (error) {
        res.status(404).send({ msg: "Something went wrong please try again" })
    }


})

TodoRoutes.get("/:id", async (req, res) => {
    const { status } = req.query
    const { id } = req.params
    const { UserID } = req.body

    try {

        const TodoList = await TodoModals.find({ UserID, _id: id })
        res.status(200).send(TodoList)

    } catch (error) {
        res.status(404).send({ msg: "Something went wrong please try again" })
    }


})

TodoRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params
    const { UserID } = req.body



    try {

        const TodoList = await TodoModals.findOne({ _id: id })

        if (TodoList.UserID === UserID) {
            await TodoModals.findByIdAndDelete(id)
            res.status(200).send({
                msg: "Todo Deleted Successfully"
            })
        } else {
            res.status(401).send('Not Authorized')
        }


    } catch (error) {
        res.status(404).send({ msg: "Something went wrong please try again" })
    }


})

TodoRoutes.patch("/:id", async (req, res) => {
    let { taskname, status, tag } = req.body
    const { id } = req.params
    const { UserID } = req.body


    if (taskname === "") taskname = undefined
    if (tag === "") tag = undefined
    if (status === "") status = undefined

    try {

        const TodoList = await TodoModals.findOne({ _id: id })


        if (TodoList.UserID === UserID) {

            await TodoModals.findByIdAndUpdate(id, { taskname, status, tag })
            res.status(200).send({
                msg: "Todo Update Successfully"
            })
        } else {
            res.status(401).send('Not Authorized')
        }


    } catch (error) {
        res.status(404).send({ msg: "Something went wrong please try again" })
    }

})


module.exports = { TodoRoutes }