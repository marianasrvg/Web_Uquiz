const express = require('express');
const Quizz = require('./models/Quizz')
const router = express.Router();

//const {autenticarUser} = require("../middlewares/authUser")
//const bcrypt = require("bcryptjs")

router.route('/')
.get( async (req, res) => {
    try {
        let docs = [];
        docs = await Quizz.find({})
        res.send(docs);
    } catch (err) {
        res.status(400).send({
            error: "ocurrió un error en tu búsqueda",
            detalle: err
        });
    }
})
.post(async (req, res) => {
    let {
        name,
        description,
        url,
        creator,
        bestScore,
        worstScore,
        played,
        questions
    } = req.body;

    //FALTA VALIDAR CADA ATRIBUTO

    let quizz = {
        name,
        description,
        url,
        creator,
        bestScore,
        worstScore,
        played,
        questions
    };

    let doc = undefined
    try {
        let ndoc = await Quizz.findOne({
            name
        })
        if (ndoc) {
            res.status(403).send({
                error: "Quizz ya existe"
            });
            return
        }
        console.log(quizz);
        doc = await Quizz.crearQuizz(quizz);
        res.status(201).send()
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: "ocurrió un error revisa los datos",
            detalle: err
        })
    }

})

router.route('/:id')
.get( async (req, res) => {
    let id = req.params.id;
    doc = await Quizz.findOne({
       // exp: req.exp,
        id
    }/*, {
        _id: 0,
        id: 1,
        name: 1,
        description: 1,
        email: 1,
        password: 1,
        admin: 1
    }*/)
    if (doc) {
        res.send(doc)
    } else {
        res.status(404).send({
            error: "no se encontró el quizz"
        })
    }
})


module.exports = router;