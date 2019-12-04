const express = require('express');
const QuizzResults = require('./models/QuizzResults')
const Quizz = require('./models/Quizz')
const router = express.Router();
const middlewares = require('./middlewares');
const joi = require('joi');

router.route('/')
    .get(middlewares.tokenValidator, async (req, res) => {
        try {
            let docs = [];
            docs = await QuizzResults.find({
                user: req.body.id
            })
            res.send(docs);
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })
    .post(middlewares.tokenValidator, async (req, res) => {
        const schemaQuizzResults = {
            user: joi.required(),
            nickname: joi.required(),
            quizz: joi.required(),
            //ESTE ID es el del usuario que viene del middleware
            id: joi.required()
        }

        let quizzResults = joi.validate(req.body, schemaQuizzResults);

        if (quizzResults.error) {
            res.status(400).send(`Bad request ${quizzResults.error.details[0].message}`);
            return;
        }
        delete quizzResults.value.id;

        let doc = undefined
        try {
            let ndoc = await Quizz.findOne({
                id: quizzResults.value.quizz
            });
            if (!ndoc) {
                res.status(404).send("Quizz not found");
                return
            }
            doc = await QuizzResults.crearQuizz(quizzResults.value);
            res.status(201).send({
                id: doc.id
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })

router.route('/:pin')
    .get(middlewares.tokenValidator, middlewares.ownershipQRValidator, async (req, res) => {
        let id = req.params.pin;
        let doc = undefined;
        try {
            doc = await QuizzResults.findOne({
                id
            })
            if (doc) {
                res.send(doc)
            } else {
                res.status(404).send({
                    error: "Quizz not found"
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })
    .put(middlewares.tokenValidator, async (req, res) => {
        let id = req.params.pin;

        const schemaQuizz = {
            quizz: joi.required(),
            user: joi.required(),
            nickname: joi.optional(),
            score: joi.required(),
            time: joi.optional(),
            answers: joi.array().items(joi.object({
                question: joi.required(),
                time: joi.optional(),
                correct: joi.required(),
                answer: joi.required()
            })),
            id: joi.required(),
            _id: joi.optional(),
            __v: joi.optional()
        }

        let quizz = joi.validate(req.body, schemaQuizz);

        delete quizz.value.id;

        if (quizz.error) {
            res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
            return;
        }


        let doc = undefined
        try {
            doc = await QuizzResults.findOne({
                id
            })
            if (doc) {
                await doc.editarQuizz(quizz.value);
                res.status(200).send()
            } else {
                res.status(404).send("Quizz not found")
            }

        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })

module.exports = router;