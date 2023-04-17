const express = require("express")
const UserModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userroute = express.Router()
const bcrypt = require("bcrypt")
const blacklistModel = require("../model/blacklist.model")
const auth = require("../middleware/auth.middleware")

userroute.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const userCheck = await UserModel.findOne({ email })
        if (userCheck) {
            res.send("User Already exists with provided credentials")
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            const addedUser = new UserModel({ name, email, password: hash, role })
            await addedUser.save()
            res.send({
                msg: "Registeration success"
            })
        })
    } catch (error) {
        res.send("something went wrong")
    }
})
userroute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userCheck = await UserModel.findOne({ email })
        console.log(userCheck)
        if (!userCheck) {
            return res.send("No Account Found, please login !!")
        }
        bcrypt.compare(password, userCheck.password, (err, result) => {
            if (result) {
                const AccessToken = jwt.sign({ userid: userCheck._id }, process.env.access, { expiresIn: "1m" })
                const RefreshToken = jwt.sign({ userid: userCheck._id }, process.env.refresh, { expiresIn: "3m" })
                res.cookie("AccessToken", AccessToken, { maxAge: 1000 * 60 * 1 })
                res.cookie("RefreshToken", RefreshToken, { maxAge: 1000 * 60 * 3 })
                res.send({
                    msg: "Login Sucess"
                })
            } else {
                res.status(400).send({
                    msg: "Wrong password or Credentials"
                })
            }
        })
    } catch (error) {
        res.send("something went wrong")
    }
})

userroute.post("/logout", async (req, res) => {
    console.log(req.cookies)
    try {
        const token = req.cookies.AccessToken
        console.log("token: ", token)
        const blacklistadd = new blacklistModel({ token: token })
        await blacklistadd.save()
        res.send({
            msg: "Logout Success"
        })
    } catch (error) {
        res.status(400).send({
            msg: "something went wrong"
        })
    }
})

userroute.get("/get-new-token", (req, res) => {
    try {
        const { RefreshToken } = req.cookies


        console.log("refresh check", RefreshToken)
        jwt.verify(RefreshToken, "RefreshToken", (err, decoded) => {
            if (decoded) {
                const newAcessToekn = jwt.sign({ userrole: decoded.userrole }, process.env.access, { expiresIn: "2m" })
                res.cookie("AccessToken", newAcessToekn, { maxAge: 1000 * 60 * 1 })
                res.send({
                    msg: "Token generated suceesfully"
                });
            } else {
                res.status(400).send({
                    msg: "Login Again !!"
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            msg: "Something Went Wrong"
        })
    }
})

module.exports = userroute