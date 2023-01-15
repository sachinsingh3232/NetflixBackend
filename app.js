const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const userRoute = require('./Routes/userRoute')
const movieRoute = require('./Routes/movieRoute')
const ListRoute = require('./Routes/listRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/netflix/user", userRoute)
app.use("/netflix/movie", movieRoute)
app.use("/netflix/list", ListRoute)
module.exports = app;