const express = require("express")
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require("../verifyToken");
const Like = require("../models/Like");

router.post("/:id", async(req, res) =>{
    try{
        const postId = req.params.id
        const userId = req.body.userId
        const found = await Like.findOne({"likes": {postId: postId, userId: userId}})
        if(!found){
            await Like.create({"likes": {postId: postId, userId: userId}})
            res.status(200).json("Liked")
        }else{
            await Like.deleteOne({"likes": {postId: postId, userId: userId}})
            res.status(200).json("unliked")
        }
        // res.status(200).json("Liking!")
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router