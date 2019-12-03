const express = require('express');
const Quizz = require('./models/Quizz')
const router = express.Router();

//const {autenticarUser} = require("../middlewares/authUser")
//const bcrypt = require("bcryptjs")

router.route('/')
.post(async (req, res) => {
    let {
        id,
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
        id,
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
            id
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


module.exports = router;