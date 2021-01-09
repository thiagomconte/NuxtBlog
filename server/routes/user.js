const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const { validateNewUser } = require("../validators/userValidator");
const { isAuth } = require("../authencitaction/authorization");
const jwt = require("jsonwebtoken");

//! POST REQUEST - NEW USER
router.post("/register", validateNewUser, async (req, res) => {
    let { name, email, password } = req.body;
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save((err) => {
        if (err) {
            var string = JSON.stringify(err);
            var obj = JSON.parse(string);
            if (obj.keyPattern.email) {
                res.status(400).json({
                    success: false,
                    message: "Este e-mail já se encontra em uso",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Tente novamente mais tarde",
                });
            }
        } else {
            let token = jwt.sign(user.toJSON(), process.env.SECRET, {
                expiresIn: 604800, //1 week
            });
            res.json({
                success: true,
                token: token,
                message: "Sua conta foi criada com sucesso",
            });
        }
    });
});

//! LOGIN
router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Credenciais incorretas",
            });
        } else {
            if (user.comparePassword(req.body.password)) {
                let token = jwt.sign(user.toJSON(), process.env.SECRET, {
                    expiresIn: 604800,
                });
                res.json({
                    success: true,
                    token: token,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Credenciais incorretas",
                });
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Erro interno" });
    }
});

//! PROFILE ROUTER
router.get("/profile", isAuth, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.decoded._id });
        if (user) {
            res.json({
                success: true,
                user: user,
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Erro interno" });
    }
});

router.post("/update", isAuth, async (req, res) => {
    try {
        let { name, password } = req.body;
        let user = await User.findByIdAndUpdate({ _id: req.decoded._id });
        if (name) user.name = name;
        if (password && password.length > 8) {
            user.password = password;
        } else if (password && password.length < 8) {
            res.status(500).json({
                success: false,
                message: "A senha deve conter no mínimo 8 caracteres",
            });
        } else {
            await user.save();
            res.json({
                success: true,
                message: "Perfil atualizado com sucesso",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erro interno" });
    }
});

module.exports = router;
