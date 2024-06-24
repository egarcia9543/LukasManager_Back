const dbReport = require('../repository/reports.data');

exports.saveReport = async (req, res, next) => {
    const { user, month, mandatoryExpenses, otherExpenses } = req.body || {};

    if (!user || !month || !mandatoryExpenses || !otherExpenses) {
        return res.status(400).json({
            error: 'Ingresa los datos requeridos'
        });
    }

    try {
        const newReportRecord = await dbReport.saveReport(req.body);
        if (newReportRecord) {
            return res.status(201).json({
                report: newReportRecord
            });
        } else {
            return res.status(500).json({
                error: 'Ocurrió un error al registrar el reporte'
            });
        }
    } catch (error) {
        next(error);
    }
};

