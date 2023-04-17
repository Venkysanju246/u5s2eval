const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:String,
    description:String,
    userid:String
})

const blogModel= mongoose.model("blogeval", blogSchema)

module.exports = blogModel