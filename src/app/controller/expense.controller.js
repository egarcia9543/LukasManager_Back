const dbExpense = require('../repository/expenses.data');

exports.saveExpense = async (req, res, next) => {
    const { user, description, amount, date, category } = req.body || {};
    console.log(req.body);

    if (!user || !description || !amount || !category || !date) {
        return res.status(400).json({
            error: 'Ingresa los datos requeridos'
        });
    }

    try {
        const newExpenseRecord = await dbExpense.createExpenseRecord(req.body);
        if (newExpenseRecord) {
            return res.status(201).json({
                expense: newExpenseRecord
            });
        } else {
            return res.status(500).json({
                error: 'Ocurrió un error al registrar el gasto'
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getExpenseByDate = async (req, res, next) => {
    const { date, user } = req.query || {};

    if (!date) {
        return res.status(400).json({
            error: 'Ingresa la fecha requerida'
        });
    }

    if (!user) {
        return res.status(400).json({
            error: 'Ingresa el ID del usuario requerido'
        });
    }

    try {
        const expenseRecord = await dbExpense.getExpenseByUserAndDate({user, date });
        if (expenseRecord) {
            return res.status(200).json({
                expense: expenseRecord
            });
        } else {
            return res.status(404).json({
                error: 'No se encontraron gastos para la fecha indicada'
            });
        }
    } catch (error) {
        next(error);
    }
}