const express = require('express');
const routes = require('./src/routes');
const cors = require('cors')

const app = express();

app.use(cors())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server running on port 3000!');
});
