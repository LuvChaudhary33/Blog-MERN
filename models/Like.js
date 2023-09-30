const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    likes:{
        type:Object,
    },
}, {timestamps: true})

module.exports = mongoose.model("Like", LikeSchema)