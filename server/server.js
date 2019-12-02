const express = require('express');
const login = require('./login');
const users = require('./users');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/login', login);
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Web Uquizz app');
});

app.listen(port, () => console.log("Web Uquizz backend running"));
