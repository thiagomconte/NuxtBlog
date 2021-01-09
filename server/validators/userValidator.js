module.exports = {
    validateNewUser: function (req, res, next) {
        let { name, email, password, checkpassword } = req.body;

        if (!name || !email || !password || !checkpassword) {
            res.status(500).json({
                success: false,
                message: "Preencha todos os campos",
            });
        } else if (name.length < 3) {
            res.status(500).json({
                success: false,
                message: "Nome deve conter no mínimo 3 caracteres",
            });
        } else if (name.length > 50) {
            res.status(500).json({
                success: false,
                message: "Tamanho maximo para o nome deve ser de 50 caracteres",
            });
        } else if (password.length < 8 || password.length > 20) {
            res.status(500).json({
                success: false,
                message: "Senha deve conter entre 8 a 20 caracteres",
            });
        } else if (password !== checkpassword) {
            res.status(500).json({
                success: false,
                message: "As senhas não conferem",
            });
        } else {
            next();
        }
    },
};
