const express = require('express');
const login = require('./login');
const users = require('./users');
const quizz = require('./quizz');
const cors = require('cors');
//API
//const quizzresults = require("./middlewares/quizzresults");

//MongoDB
const quizzResult = require('./quizzResult');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/quizz', quizz);
app.use('/api/quizzresults', quizzResult);

app.get('/', (req, res) => {
    res.send('Web Uquizz app');
});

app.listen(port, () => console.log("Web Uquizz backend running"));
