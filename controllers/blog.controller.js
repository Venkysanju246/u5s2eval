const express = require("express")
const blogModel = require("../model/blog.model")
const auth = require("../middleware/auth.middleware")
const authorise = require("../middleware/authorise")

const blogroute = express.Router()

blogroute.post("/add", auth, async (req, res) => {
    const { title, description } = req.body
    console.log(title, description)
    const postadd = new blogModel({ title, description })
    await postadd.save()
    res.send({
        msg: "Post Uploaded Successfully"
    })
})

blogroute.patch("/update/:id", async(req, res)=>{
    const {id} = req.params
    const payload = req.query
    const updatedblog = await blogModel.findByIdAndUpdate({_id:id}, payload)
    res.send({
        msg:"blog updated sucesfully"
    })
})
blogroute.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params
    const deletedblog = await blogModel.findByIdAndUpdate({_id:id})
    res.send({
        msg:"blog deleted sucesfully"
    })
})
blogroute.get("/all",async (req, res)=>{
    const data = await blogModel.find()
    res.send({
        msg:"request sucesss"
    })
})

blogroute.delete("/mod/delete/:id",authorise(["moderator"]), async(req, res)=>{
    const {id} = req.params
    const deletedblog = await blogModel.findByIdAndUpdate({_id:id})
    res.send({
        msg:"blog deleted sucesfully"
    })
})



module.exports = blogroute