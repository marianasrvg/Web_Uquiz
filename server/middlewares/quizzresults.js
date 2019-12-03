const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const fs = require('fs');
const joi = require('joi');

const quizzesResults = JSON.parse(fs.readFileSync('quizzresults.json'));


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

    //Se debería revisar que sea un quizz válido

    quizzesResults.push(quizzResults.value);
    fs.writeFileSync('quizzresults.json',JSON.stringify(quizzesResults));
    res.status(201).send();
});

router.put("/:id", middlewares.tokenValidator, (req, res) => {
    //VERIFICAR USUARIO
    let id = req.params.id;
    console.log("Hello "+ id);
    let quizzIndex = quizzesResults.findIndex(q => q.id == id);

    if(quizzIndex == -1){
        res.status(404).send("QuizzResult not found");
    } else {
        console.log("FOUND AT" + quizzIndex);
    }

    const schemaQuizz = {
        quizz: joi.required(),
        user: joi.required(),
        nickname: joi.optional(),
        score: joi.required(),
        time: joi.optional(),
        answers: joi.array().items( joi.object({
            question: joi.required(),
            time: joi.optional(),
            correct: joi.required(),
            answer: joi.required()
        })),
        id: joi.required() 
    }

    let quizz = joi.validate(req.body, schemaQuizz);

    if(quizz.error){
        res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
        return;
    } 
    quizzesResults[quizzIndex] = quizz.value;

    //BORRAR DESPUES
    quizzesResults[quizzIndex].id = parseInt(id);

    console.log(quizzesResults);

    fs.writeFileSync('quizzresults.json',JSON.stringify(quizzesResults));
    res.status(201).send();
});



module.exports = router;