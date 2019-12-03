const express = require('express');
const router = express.Router();
const fs = require('fs');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const quizzes = JSON.parse(fs.readFileSync('quizz.json'));

router.post("/", (req, res) => {

    //VERIFICAR USER

    const schemaQuizz = {
        name: joi.required(),
        description: joi.required(),
        url: joi.optional(),
        creator: joi.required(),
        questions: joi.array().items( joi.object({
            question: joi.required(),
            time: joi.optional(),
            answers: joi.array().items( joi.object({
                answer: joi.required(),
                correct: joi.required()
            }))
        }))
    }

    let quizz = joi.validate(req.body, schemaQuizz);

    if(quizz.error){
        res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
        return;
    } 
    quizzes.push(quizz.value);
    fs.writeFileSync('quizz.json',JSON.stringify(quizzes));
    res.status(201).send();
});

router.get("/", (req, res) => {
    //VERIFICAR USER
    // ADMIN

    let result = quizzes.map((item) => {
        let q = {
            name: item.name,
            description: item.description,
            score: item.score,
            time: item.time,
            url: item.url,
        }
        return q;
    });

    res.status(200).send(result);
});

router.get("/:id", (req, res) => {

});

module.exports = router;