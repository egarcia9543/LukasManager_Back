const dbUser = require('../repository/users.data');

exports.registerUser = async (req, res, next) => {
    const { email } = req.body || {};

    if (!email) {
        return res.status(400).json({
            error: 'Ingresa un email válido'
        });
    }

    try {
        const isEmailRegistered = await dbUser.getUserData({ email }, { email: 1 });
        if (isEmailRegistered) {
            return res.status(400).json({
                error: 'El email ya se encuentra registrado'
            });
        }
        const newUserRecord = await dbUser.createUserRecord(req.body);
        if (newUserRecord) {
            return res.status(201).json({
                user: newUserRecord
            });
        } else {
            return res.status(500).json({
                error: 'Ocurrió un error al registrar el usuario'
            });
        }
    } catch (error) {
        next(error);
    }
};