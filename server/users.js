const express = require('express');
const router = express.Router();
const joi = require('joi');
const User = require('../server/models/User');
const middlewares = require('./middlewares');

router.route('/')
    .get(middlewares.tokenValidator, middlewares.adminValidator, async (req, res) => {
        try {
            let docs = [];
            docs = await User.find({})
            res.send(docs);
        }  catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }

    })
    .post(async (req, res) => {
        const schemaSignUp = {
            firstName: joi.required(),
            lastName: joi.required(),
            email: joi.required(),
            password: joi.required(),
            admin: joi.required(),
        }

        let result = joi.validate(req.body, schemaSignUp);

        if (result.error) {
            res.status(400).send(`Bad Request,${result.error.details[0].message}`);
            return;
        }
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            admin: req.body.admin,
            password: req.body.password
        };
        
        let doc = undefined

        try {
            let ndoc = await User.findOne({
                email: user.email
            });
            if (ndoc) {
                res.status(400).send("Email already registered");
                return
            }
            doc = await User.crearUsuario(user);
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
    .get(middlewares.tokenValidator, middlewares.adminValidator, async (req, res) => {
        let id = req.params.id;
        doc = await User.findOne({
            id
        }, {
            _id: 0,
            id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            password: 1,
            admin: 1
        })
        if (doc) {
            res.send(doc)
        } else {
            res.status(404).send({
                error: "User not found"
            })
        }
    })
    .put(middlewares.tokenValidator, middlewares.permissionValidator, async (req, res) => {
        let id = req.params.id;

        const schemaEdit = {
            firstName: joi.required(),
            lastName: joi.required(),
            email: joi.required(),
            admin: joi.required(),
            password: joi.required(),
            id: joi.required(),
        }
       
        let result = joi.validate(req.body, schemaEdit);
        delete result.value.id;

        if (result.error) {
            res.status(400).send(`Bad Request,${result.error.details[0].message}`);
            return
        }

      
        let doc = undefined
        try {
            doc = await User.findOne({
                id
            })
            if (doc) {
                await doc.editarUsuario(result.value);
                res.status(200).send()
            } else {
                res.status(404).send("User not found")
            }

        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Database error",
                detalle: err
            })
        }
    })
    .delete(middlewares.tokenValidator,middlewares.adminValidator, async (req, res) => {
        let id = req.params.id;
        let doc = undefined
        try {
            doc = await User.findOne({
                id
            });
            if (doc) {
                await User.findOneAndDelete({
                    id
                })
                res.status(200).send({
                    removed: doc.id
                })
            } else {
                res.status(404).send({
                    error: "User not found"
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