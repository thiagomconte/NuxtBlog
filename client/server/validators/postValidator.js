const Post = require("../models/post");

module.exports = {
    postValidator: async function (req, res, next) {
        let { title, description, slug, content, img, imgOwner } = req.body;
        if (!title || !description || !slug || !content || !img || !imgOwner) {
            return res.status(400).json({
                success: false,
                message: "Preencha todos os campos",
            });
        }
        try {
            const post = await Post.findOne({ slug: slug });
            if (post) {
                res.status(400).json({
                    success: false,
                    message: "Esta slug já existe",
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro interno, tente novamente mais tarde",
            });
        }
    },
    postUpdateValidator: async function (req, res, next) {
        let { title, description, slug, content, img, imgOwner } = req.body;
        if (!title || !description || !slug || !content || !img || !imgOwner) {
            res.status(400).json({
                success: false,
                message: "Preencha todos os campos",
            });
        }else{
            next();
        }
    },
};
