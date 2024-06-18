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


exports.login = async (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            error: 'Ingresa un email y contraseña válidos'
        });
    }

    try {
        const userRecord = await dbUser.getUserData({ email });
        if (userRecord) {
            if (userRecord.password === password) {
                return res.status(200).json({
                    user: userRecord
                });
            } else {
                return res.status(401).json({
                    error: 'Contraseña incorrecta'
                });
            }
        } else {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        next(error);
    }
};