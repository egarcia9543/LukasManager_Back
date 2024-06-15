const dbUser = require('../repository/users.data');

exports.registerUser = async (req, res) => {
    const {email} = req.body || {};
    if (!email) return res.json({
        error: 'Ingresa un email válido'
    });
    try {
        const isEmailRegistered = await dbUser.getUserData({email}, {email: 1});
        if (isEmailRegistered) {
            return res.json({
                error: 'Este correo ya se encuentra registrado'
            });
        };

        const newUserRecord = await dbUser.createUserRecord(req.body);
        if (newUserRecord) {
            return res.json({
                success: 'El usuario se ha registrado correctamente'
            });
        };
    } catch (error) {
        return res.json({
            error
        });
    };
};