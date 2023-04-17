const mongoose = require("mongoose")
const blacklistschema = mongoose.Schema({
    token:String
})

const blacklitModel = mongoose.model("blacklist", blacklistschema)

module.exports = blacklitModel