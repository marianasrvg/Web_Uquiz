const express = require('express');
const Quizz = require('./models/Quizz')
const router = express.Router();
const joi = require('joi');
const middlewares = require('./middlewares');

//const {autenticarUser} = require("../middlewares/authUser")
//const bcrypt = require("bcryptjs")

router.route('/')
    .get(middlewares.tokenValidator, middlewares.adminValidator, async (req, res) => {
        try {
            let docs = [];
            docs = await Quizz.find({
                creator: req.body.id
            })
            let result = docs.map((item) => {
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
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })
    .post(middlewares.tokenValidator, async (req, res) => {

        //VERIFICAR USER

        const schemaQuizz = {
            name: joi.required(),
            description: joi.required(),
            url: joi.optional(),
            creator: joi.required(),
            questions: joi.array().items(joi.object({
                question: joi.required(),
                time: joi.optional(),
                url: joi.optional(),
                answers: joi.array().items(joi.object({
                    answer: joi.required(),
                    correct: joi.required()
                }))
            })),
            //ESTE ID es el del usuario que viene del middleware
            id: joi.required()
        }

        let quizz = joi.validate(req.body, schemaQuizz);

        if (quizz.error) {
            res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
            return;
        }
        delete quizz.value.id;

        let doc = undefined
        try {
            doc = await Quizz.crearQuizz(quizz.value);
            res.status(201).send()
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })

router.route('/:id')
    .get(middlewares.tokenValidator, async (req, res) => {
        let id = req.params.id;
        doc = await Quizz.findOne({
            id
        })
        if (doc) {
            res.status(200).send(doc)
        } else {
            res.status(404).send({
                error: "Quizz not found"
            })
        }
    })
    .put(async (req, res) => {
        let id = req.params.id;
        /*let {
            name,
            description,
            url,
            creator,
            questions,
            correct
        } = req.body;

        let quizz = {
            name,
            description,
            url,
            creator,
            questions,
            correct
        };*/
        const schemaQuizz = {
            name: joi.required(),
            description: joi.required(),
            url: joi.optional(),
            creator: joi.required(),
            bestScore: joi.optional(),
            worstScore: joi.optional(),
            played: joi.optional(),
            questions: joi.array().items(joi.object({
                question: joi.required(),
                time: joi.optional(),
                url: joi.optional(),
                answers: joi.array().items(joi.object({
                    answer: joi.required(),
                    correct: joi.required()
                }))
            })),
            correct: joi.array().items(
                joi.array().optional()
            ).optional()
        }

        let quizz = joi.validate(req.body, schemaQuizz);

        if (quizz.error) {
            res.status(400).send(`Bad request ${quizz.error.details[0].message}`);
            return;
        }

        let doc = undefined
        try {
            doc = await Quizz.findOne({
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
    .delete(middlewares.tokenValidator, middlewares.permissionValidator,async (req, res) => {
        let id = req.params.id;
        let doc = undefined
        try {
            doc = await Quizz.findOne({
                id
            });
            if (doc) {
                await Quizz.findOneAndDelete({
                    id
                })
                res.status(200).send({
                    removed: doc.id
                })
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

module.exports = router;