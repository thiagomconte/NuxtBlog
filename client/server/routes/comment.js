const router = require("express").Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const { isAuth } = require("../authencitaction/authorization");

router.post("/add", isAuth, async (req, res) => {
    let { post_id, content } = req.body;
    let user = await User.findOne({ _id: req.decoded._id });
    let user_id = user._id
    if (!user_id || !post_id) {
        return res.status(500).json({
            success: false,
            message: "Não foi possível publicar o comentário",
        });
    }
    if (!content) {
        return res.status(500).json({
            success: false,
            message: "O comentário não pode ficar em branco",
        });
    }
    try {
        const comment = new Comment({
            user_id,
            post_id,
            content,
        });
        await comment.save();
        res.json({
            success: true,
            comment_id: comment._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

router.get("/:id/:limit", async (req, res) => {
    let limit = parseInt(req.params.limit);
    try {
        const num = (await Comment.find({ post_id: req.params.id })).length;
        const commentsFound = await Comment.find({ post_id: req.params.id })
            .limit(limit)
            .populate({ path: "user_id", select: "-password -_id -email" })
            .sort({ _id: "desc" });
        return res.status(200).send({ commentsFound, num: num });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.id });
        res.json({
            success: true,
            message: "Comentário removido",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

module.exports = router;
