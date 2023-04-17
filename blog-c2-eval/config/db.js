const mongoose = require("mongoose")
require("dotenv").config()
const connectionToDb = process.env.mongoURL

module.exports = connectionToDb