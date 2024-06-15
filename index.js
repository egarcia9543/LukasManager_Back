const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/', routes);

app.get('/', (req, res) => {
    res.json({hola: 'mundo'})
})

app.listen(3000, () => {
    console.log('Server running!');
});