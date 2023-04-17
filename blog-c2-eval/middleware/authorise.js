const authorise = (permittedroles) => {
    return (req, res, next) => {
        const role = req.role
        if (permittedroles.includes(role)) {
            next()
        } else {
            res.send("Unauthorised")
        }
    }
}

module.exports = authorise