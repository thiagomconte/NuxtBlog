const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user")
const Comment = require("../models/comment")
const {
    postValidator,
    postUpdateValidator,
} = require("../validators/postValidator");
const { isAuth } = require("../authencitaction/authorization");

//! CREATE NEW POST
router.post("/add", postValidator, isAuth, async (req, res) => {
    let { title, description, slug, content, img, imgOwner } = req.body;

    try {
        let post = new Post({
            title,
            description,
            slug,
            content,
            img,
            imgOwner,
        });
        await post.save();
        res.json({
            success: true,
            message: "Postagem criada!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

//! GET ALL POSTS
router.get("/:page", async (req, res) => {
    var perPage = 5,
        page = Math.max(0, req.params.page);
    try {
        const tam = (await Post.find()).length;
        const posts = await Post.find()
            .limit(perPage)
            .skip(perPage * (page - 1))
            .sort({ _id: "desc" });
        res.json({
            success: true,
            posts: posts,
            tam: tam,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Não foi possível carregar as mensagens",
        });
    }
});

router.get("/getpost/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        const comments = await Comment.find({ post_id: post._id}).populate({path:'user_id', select:'-password -_id -email'}).sort({ _id: "desc" }).exec()
        const numOfComments = (await Comment.find({post_id: post._id})).length
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Postagem não encontrada",
            });
        }
        res.json({
            success: true,
            post: post,
            comments: comments,
            numOfComments: numOfComments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

//! EDIT POST
router.get("/edit/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Postagem não encontrada",
            });
        }
        res.json({
            success: true,
            post: post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

router.post("/edit/:slug", postUpdateValidator, async (req, res) => {
    let { title, description, slug, content, img, imgOwner } = req.body;
    try {
        post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            { new: true }
        );
        post.title = title;
        post.description = description;
        post.slug = slug;
        post.content = content;
        post.img = img;
        post.imgOwner = imgOwner;
        await post.save();
        res.json({
            success: true,
            message: "Postagem atualizada",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erro interno",
        });
    }
});

//! DELETE POST
router.delete("/delete/:id", async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id });
        await Comment.deleteMany({ post_id: post._id });
        res.json({
            success: true,
            message: "Postagem deletada",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erro interno, não foi possível deletar a postagem.",
        });
    }
});

module.exports = router;
