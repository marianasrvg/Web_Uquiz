const express = require('express');
const QuizzResults = require('./models/QuizzResults')
const router = express.Router();

//const {autenticarUser} = require("../middlewares/authUser")
//const bcrypt = require("bcryptjs")

router.route('/')
.get( async (req, res) => {
    try {
        let docs = [];
        docs = await QuizzResults.find({})
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
        user,
        nickname,
        quizz
    } = req.body;

    //FALTA VALIDAR CADA ATRIBUTO

    let quizzR = {
        user,
        nickname,
        quizz
    };

    let doc = undefined
    try {
        console.log(quizz);
        doc = await QuizzResults.crearQuizz(quizzR);
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
    doc = await QuizzResults.findOne({
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
.put(async (req, res) => {
    let id = req.params.id;
    let {quizz, user, nickname, score, time,answers} = req.body;

    let quizzR = {
        user,
        nickname,
        score,
        quizz,
        time,
        answers
      };


    /*let str="";
    for (let k in quizzR ){
        if( k!= "correct" && quizzR[k]==undefined  )
            str+="Falta "+k+ ", "    
    }

    if(str.length>0){
        res.status(400).send({error:str});
        return
    }*/

    
    console.log(quizzR);
    let doc = undefined
    try {
        doc = await QuizzResults.findOne({
            id
        })
        if (doc) {
            //str.password = (password ="")? doc.password : bcrypt.hashSync(password,8)
            //str.password = (password ="")? doc.password : password

            await doc.editarQuizz(quizzR);
            res.status(200).send()
        } else {
            res.status(404).send("No se encontró quizz")
        }

    } catch (err) {
        res.status(400).send({
            error: "ocurrió un error revisa los datos",
            detalle: err
        })
    }
})

module.exports = router;