const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"User",
        enum:["User", "Moderator"]
    }
})

const userModel = mongoose.model("usereval", userSchema)

module.exports = userModel