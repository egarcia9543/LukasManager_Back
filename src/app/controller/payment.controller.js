const dbPayment = require('../repository/payment.data');
const dbUser = require('../repository/users.data');

exports.createPayment = async (req, res) => {
    const {user_id, payments} = req.body;
    try {
        const user = await dbUser.getUserData({ _id: user_id });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        payments.forEach(async (payment) => {
            await dbPayment.createPaymentRecord({
                user: user_id,
                description: payment.description,
                amount: payment.amount,
                category: payment.category,
                paymentDay: payment.paymentDay
            });
        });
        res.status(201).json({ message: 'Pago registrado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getPaymentsByUser = async (req, res) => {
    const { user_id } = req.query;
    try {
        const user = await dbUser.getUserData({ _id: user_id });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const payments = await dbPayment.getPaymentsByUser(user_id);
        const totalPayments = payments.reduce((acc, payment) => acc + payment.amount, 0);
        res.status(200).json({ payments, totalPayments });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deletePayment = async (req, res) => {
    const { payment_id } = req.query;
    try {
        const payment = await dbPayment.deletePaymentRecord({ _id: payment_id });
        if (!payment) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.status(200).json({ message: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}