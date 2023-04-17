const express = require("express")
const userroute = require("./controllers/user.controller")
const cookieParser = require("cookie-parser")
const blogroute = require("./controllers/blog.controller")
const auth = require("./middleware/auth.middleware")
const app = express()
app.use(cookieParser())
app.use("/user", userroute)
app.use(auth)
app.use("/blog", blogroute)


app.listen(8080, ()=>{
    console.log("server running at port 8080")
})