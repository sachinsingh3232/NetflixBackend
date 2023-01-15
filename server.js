const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const connectDB = require('./Config/database')
connectDB();

app.listen(5000, () => {
    console.log("server running on port 5000")
})