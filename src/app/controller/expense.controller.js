const user = require('../models/users.model');
const dbExpense = require('../repository/expenses.data');

exports.saveExpense = async (req, res, next) => {
    const { user_id, date, expenses } = req.body || {};

    if (!user_id || !date || !expenses) {
        return res.status(400).json({
            error: 'Ingresa los datos requeridos'
        });
    }

    try {
        expenses.forEach(async (expense) => {
            await dbExpense.createExpenseRecord(
                {
                    user: user_id,
                    description: expense.description,
                    amount: expense.amount,
                    date,
                    month: new Date(date).getMonth(),
                    year: new Date(date).getFullYear(),
                    category: expense.category
                }
            );
        });
        return res.status(201).json({
            message: 'Gastos guardados correctamente'
        });
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

exports.getExpensesOfTheMonth = async (req, res, next) => {
    const { date, user } = req.query || {};
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    if (!date) {
        return res.status(400).json({
            error: 'Ingresa la fecha'
        });
    }

    if (!user) {
        return res.status(400).json({
            error: 'Ingresa el ID del usuario requerido'
        });
    }

    try {
        const expenseRecord = await dbExpense.getExpensesByUserInAMonth({ user, month, year });
        if (expenseRecord) {
            return res.status(200).json({
                expenses: expenseRecord,
                amount: expenseRecord.reduce((acc, expense) => acc + expense.amount, 0)
            });
        } else {
            return res.status(404).json({
                error: 'No se encontraron gastos para el mes indicado'
            });
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteExpense = async (req, res, next) => {
    const { expense_id } = req.query || {};

    if (!expense_id) {
        return res.status(400).json({
            error: 'Ingresa el ID del gasto requerido'
        });
    }

    try {
        const expenseRecord = await dbExpense.deleteExpenseRecord({ _id: expense_id });
        if (expenseRecord) {
            return res.status(200).json({
                message: 'Gasto eliminado correctamente'
            });
        } else {
            return res.status(404).json({
                error: 'No se encontró el gasto'
            });
        }
    } catch (error) {
        next(error);
    }
};