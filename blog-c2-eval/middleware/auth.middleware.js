const blacklistModel = require("../model/blacklist.model")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const { AccessToken } = req.cookies
        console.log(AccessToken)
        const tokenCheck = await blacklistModel.findOne({ token: AccessToken })
        console.log("check: ", tokenCheck)
        if (tokenCheck) {
            return res.status(400).send({
                msg: " token check Login Aain !!"
            })
        }
        if (AccessToken) {
            jwt.verify(AccessToken, "AcessToken", (err, decoded) => {
                console.log(decoded)
                if (decoded) {
                    req.body.userrole = decoded.userrole
                    next()
                } else {
                    res.send({
                        msg: " access token Login Again !!"
                    })
                }
            })
        } else {
            res.send({
                msg: "Login Again, no toekn found"
            })
        }

    } catch (error) {
        res.send({
            msg: `error.message ${error.message}`
        })
    }


}

module.exports = auth