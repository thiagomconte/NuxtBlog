const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const { validateNewUser } = require("../validators/userValidator");
const { isAuth } = require("../authencitaction/authorization")
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
                    message: "E-mail already exists",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Try again later",
                });
            }
        } else {
            let token = jwt.sign(user.toJSON(), process.env.SECRET, {
                expiresIn: 604800, //1 week
            });
            res.json({
                success: true,
                token: token,
                message: "Successfully created",
            });
        }
    });
});

//! LOGIN
router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(403).json({
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
                res.status(403).json({
                    success: false,
                    message: "Credenciais incorretas",
                });
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
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
      res.status(500).json({ success: false, message: err.message });
    }
});


module.exports = router;
