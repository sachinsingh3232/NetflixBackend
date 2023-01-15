const jwt = require('jsonwebtoken')
const User = require("../Models/userModel");

const isUserAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token)
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken.id);
            req.user = user;
            req.decodedToken = decodedToken;
            next();
        }
        else {
            res.status(401).json({ message: "Please Login" })
        }
    } catch (e) {
        console.log(e);
    }
}
const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user)
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.json({ message: "You are not Admin" })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = { isUserAuthenticated, isAdmin };