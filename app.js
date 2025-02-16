const express = require("express")
const cors = require("cors")
require("express-async-errors")
const path = require("path")

const errorMiddleware = require("./middlewares/error")
const connectDB = require("./config/database")
const pollRoutes = require("./routes/poll_routes")

require("dotenv").config()

const app = express()
app.use(express.static(path.resolve(__dirname, "./client/dist"))); // PROVIDING FRONTEND APP
app.use(express.json())
app.use(cors({
    origin : "http://localhost:5173",
}))

app.use("/api/v1", pollRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html")); // SERVER GIVEING FRONTEND APP TO USERS
  });

app.use("*", (req, res) => {
    res.status(404).json({msg : "No such path found"})
})

app.use(errorMiddleware)


const port = process.env.PORT || 80

connectDB(process.env.CONN_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`server is listening on port -> ${port}`)
        })
    })
    .catch((error) => {
        console.log(`server not started,  error in connecting db -> ${error}`)
    })

