const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
    isAuth: function (req, res, next) {
        let token =
            req.headers["x-acess-token"] || req.headers["authorization"];
        let checkBearer = "Bearer ";
        if (token) {
            if (token.startsWith(checkBearer)) {
                token = token.slice(checkBearer.length, token.length);
            }
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.status(403).json({
                        success: false,
                        message: "Failed to authenticate",
                    });
                } else {
                    let user = await User.findOne({ _id: decoded._id });
                    if (user) {
                        req.decoded = decoded;
                        next();
                    } else {
                        console.log(err)
                        res.status(403).json({
                            success: false,
                            message: "Failed to authenticate",
                        });
                    }
                }
            });
        } else {
            res.status(403).json({
                success: false,
                message: "No token provided",
            });
        }
    },
    isAdmin: function (req, res, next) {
        let token =
            req.headers["x-acess-token"] || req.headers["authorization"];
        let checkBearer = "Bearer ";
        if (token) {
            if (token.startsWith(checkBearer)) {
                token = token.slice(checkBearer.length, token.length);
            }
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: "Failed to authenticate",
                    });
                } else {
                    let user = await User.findOne({ _id: decoded._id });
                    if (user && user.isAdmin) {
                        req.decoded = decoded;
                        next();
                    } else {
                        res.status(403).json({
                            success: false,
                            message: "Failed to authenticate",
                        });
                    }
                }
            });
        } else {
            res.status(403).json({
                success: false,
                message: "No token provided",
            });
        }
    },
};
