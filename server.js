const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const connectDB = require('./Config/database')
connectDB();
const PORT =process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})