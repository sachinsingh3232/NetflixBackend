const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
const Validator = require('validator')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [Validator.isEmail, "Invalid Email"],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, { timestamps: true })

userSchema.methods.get_JWT_Token = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET)
}
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // this is used to prevent the password from again hashing itself while we update the user data.
        next();
    }
    this.password = await Bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (EnteredPassword) {
    return await Bcrypt.compare(EnteredPassword, this.password)
}
module.exports = mongoose.model("User", userSchema)