const express = require('express');
const User = require('../server/models/User')
const router = express.Router();

//const {autenticarUser} = require("../middlewares/authUser")
//const bcrypt = require("bcryptjs")

router.route('/')
.get( async (req, res) => {
    try {
        let docs = [];
        docs = await User.find({})
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
        firstName,
        lastName,
        email,
        password,
        admin
    } = req.body;

    //FALTA VALIDAR CADA ATRIBUTO

    let usr = {
        firstName,
        lastName,
        email,
        password,
        admin
    };

    let doc = undefined
    try {
        let ndoc = await User.findOne({
            email
        })
        if (ndoc) {
            res.status(403).send({
                error: "usuario ya existe"
            });
            return
        }
        console.log(usr);
        doc = await User.crearUsuario(usr);
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
    doc = await User.findOne({
       // exp: req.exp,
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
            error: "no se encontró al usuario"
        })
    }
})
.put(async (req, res) => {
    let id = req.params.id;
    let {firstName, lastName, email, password, admin} = req.body;

    let usr = {
        firstName,
        lastName,
        email,
        password,
        admin,
      };

    
    let str="";
    for (let k in usr ){
        if( k!= "url" && usr[k]==undefined)
            str+="Falta "+k+ ", "    
    }

    if(str.length>0){
        res.status(400).send({error:str});
        return
    }

    
    console.log(usr);
    let doc = undefined
    try {
        doc = await User.findOne({
            id
        })
        if (doc) {
            //str.password = (password ="")? doc.password : bcrypt.hashSync(password,8)
            str.password = (password ="")? doc.password : password

            await doc.editarUsuario(usr);
            res.status(200).send()
        } else {
            res.status(404).send("No se encontró usuario")
        }

    } catch (err) {
        res.status(400).send({
            error: "ocurrió un error revisa los datos",
            detalle: err
        })
    }
})

module.exports = router;