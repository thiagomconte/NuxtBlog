const router = require("express").Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const { isAdmin } = require("../authencitaction/authorization");

router.put("/update/:id", isAdmin,async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate({ _id: req.params.id });
        user.isAdmin = !user.isAdmin;
        user.save();
        res.json({
            success: true,
            message: "Permissão do usuário atualizado com sucesso",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Não foi possível realizar a operação",
        });
    }
});

router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        await Comment.deleteMany({user_id: req.params.id})
        await User.findByIdAndDelete({ _id: req.params.id });
        res.json({
            success: true,
            message: "Usuário deletado com sucesso",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Não foi possível realizar a operação",
        });
    }
});

module.exports = router;
