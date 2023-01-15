const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String
    },
    poster: {
        type: String
    },
    titleImage: {
        type: String
    },
    imgSmall: {
        type: String
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    limit: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Movie", movieSchema)