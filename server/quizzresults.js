const express = require('express');
const router = express.Router();
const middlewares = require('./middlewares');
const fs = require('fs');
const joi = require('joi');

const quizzesResults = JSON.parse(fs.readFileSync('quizzresults.json'));

router.get("/", (req, res) => {
    res.send("Web Uquizz quizz results");
});

router.post("/", middlewares.tokenValidator, (req, res) => {
    
    const schemaQuizzResults = {
        user: joi.required(),
        nickname: joi.required(),
        quizz: joi.optional(),
        //ESTE ID es el del usuario que viene del middleware
        id: joi.required()
    }

    let quizzResults = joi.validate(req.body, schemaQuizzResults);

    if(quizzResults.error){
        res.status(400).send(`Bad request ${quizzResults.error.details[0].message}`);
        return;
    }
    delete quizzResults.value.id;
    quizzesResults.push(quizzResults.value);
    fs.writeFileSync('quizzresults.json',JSON.stringify(quizzesResults));
    res.status(201).send();
});



module.exports = router;