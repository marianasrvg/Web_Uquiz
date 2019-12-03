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
            pin: item.id,
            url: item.url,
        }
        return q;
    });

    res.status(200).send(result);
});

router.get("/:pin", (req, res) => {
    //VERIFICAR USUARIO
    let quizz = quizzes.find(q => q.id == req.params.pin);
    if(quizz == undefined){
        res.status(404).send("Ese PIN no existe");
    }
    res.status(200).send(quizz);
});

router.put("/:pin", (req, res) => {
    //VERIFICAR USUARIO
    let pin = req.params.pin;
    console.log("Hello"+ pin);
    let quizzIndex = quizzes.findIndex(q => q.id == pin);

    if(quizzIndex == -1){
        res.status(404).send("Quizz not found");
    } else {
        console.log("FOUND AT" + quizzIndex);
    }

    const schemaQuizz = {
        name: joi.required(),
        description: joi.required(),
        url: joi.optional(),
        creator: joi.required(),
        bestScore: joi.optional(),
        worstScore: joi.optional(),
        played: joi.optional(),
        questions: joi.array().items( joi.object({
            question: joi.required(),
            time: joi.optional(),
            answers: joi.array().items( joi.object({
                answer: joi.required(),
                correct: joi.required()
            }))
        })),
        correct: joi.array().items(
            joi.array().optional()
        ).optional() 
    }

    let quizz = joi.validate(req.body, schemaQuizz);

    if(quizz.error){
        res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
        return;
    } 
    quizzes[quizzIndex] = quizz.value;

    //BORRAR DESPUES
    quizzes[quizzIndex].id = parseInt(pin);

    fs.writeFileSync('quizz.json',JSON.stringify(quizzes));
    res.status(201).send();
});

router.delete("/:pin", (req, res) => {
    let quizzIndex = quizzes.findIndex(q => q.id == req.params.pin);
    
    if(quizzIndex == -1){
        res.status(404).send("Ese PIN no existe");
    }
    
    quizzes.splice(quizzIndex, 1);
    fs.writeFileSync('quizz.json',JSON.stringify(quizzes));

    res.status(200).send();
});

module.exports = router;