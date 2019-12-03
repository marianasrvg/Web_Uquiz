const express = require('express');
const router = express.Router();
const fs = require('fs');
const middlewares = require('./middlewares');

const quizzesResults = JSON.parse(fs.readFileSync('quizzresults.json'));

router.get("/",middlewares.tokenValidator, (req, res) => {
    //quizzes = quizzesResults.find(e => e.user = req.body.id);
    let quizzes = quizzesResults.filter((e) => {
        if(e.user == req.body.id){
            return e;
        } 
    });

    res.send(quizzes).status(200);
    return
});

router.get('/:pin',middlewares.tokenValidator,(req,res)=>{
    let pin = req.params.pin;
    let quizzes = quizzesResults.filter((e)=>{
        if(e.quizz == pin){
            return e
        }
    });

    res.send(quizzes).status(200);
    return
});

module.exports = router;