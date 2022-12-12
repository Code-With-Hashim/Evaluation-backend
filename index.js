require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { connect } = require('./config/db')
const { UserRoutes } = require('./routes/User.routes')
const {TodoRoutes} = require("./routes/Todo.routes")
const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use("/" , UserRoutes)
app.use("/todo" , TodoRoutes)

app.get("/", (req, res) => {
    res.send("Welcome to Todo App")
})

app.listen(PORT, async () => {
    try {
        await connect
        console.log('Database is connected Successfully')
        console.log(`Listening on PORT`)

    } catch (error) {
        console.log(error)
    }
})
