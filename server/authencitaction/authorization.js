const jwt = require("jsonwebtoken")

module.exports = {
    isAuth: function (req, res, next) {
        let token =
            req.headers["x-acess-token"] || req.headers["authorization"];
        let checkBearer = "Bearer ";
        if (token) {
            if (token.startsWith(checkBearer)) {
                token = token.slice(checkBearer.length, token.length);
            }
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: "Failed to authenticate",
                    });
                } else {
                    req.decoded = decoded;
                    next();
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
