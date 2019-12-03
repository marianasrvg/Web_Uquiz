const express = require('express');
const router = express.Router();
const fs = require('fs');
const joi = require('joi');
const middlewares = require('./middlewares');

let users = JSON.parse(fs.readFileSync('users.json'));




//---------------------------------------API-------------------------------------------------------------

router.post('/',(req, res)=>{
    const schemaSignUp = {
        firstName: joi.required(),
        lastName: joi.required(),
        email: joi.required(),
        password: joi.required(),
        admin: joi.required(),
    }

    const validUser = users.find( e => e.email === req.body.email);

    if(validUser){
        res.status(400).send("Email already registered");
        return
    }

    let result = joi.validate(req.body,schemaSignUp);

    if(result.error){
        res.status(400).send(`Bad Request,${result.error.details[0].message}`);
        return
    }else{
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            admin: req.body.admin,
            password: req.body.password
        };
        users.push(user);
        res.status(201);
        fs.writeFileSync('users.json',JSON.stringify(users));
        return
    }
});

router.get('/:id',middlewares.tokenValidator,middlewares.permissionValidator, (req,res)=>{
    let paramID = req.params.id;
    let user = users.find(e => e.id == paramID);
    res.send(user).status(200);
    return
});

router.get("/",middlewares.tokenValidator,middlewares.adminValidator, (req, res) => {
    //Mostrar todos los usuarios
    res.send(users);
    return
});

router.put('/:id',middlewares.tokenValidator,middlewares.permissionValidator,(req,res)=>{
    let paramID = req.params.id;
    let user = users.find(e => e.id == paramID);
    const index = users.indexOf(user);

    const schemaEdit = {
        firstName: joi.required(),
        lastName: joi.required(),
        email: joi.required(),
        admin: joi.required(),
        password: joi.required(),
        id: joi.optional(),
    }
    let result = joi.validate(req.body,schemaEdit);

    if(result.error){
        res.status(400).send(`Bad Request,${result.error.details[0].message}`);
        return
    }else{
        users[index].firstName = req.body.firstName;
        users[index].lastName = req.body.lastName
        users[index].email = req.body.email;
        users[index].password = req.body.password;
        users[index].admin = req.body.admin;
        fs.writeFileSync('users.json',JSON.stringify(users));
        res.status(200).send("Ok");
        return
    }
});

router.delete('/:id',middlewares.tokenValidator,middlewares.adminValidator,(req,res)=>{
    let paramID = req.params.id;
    let user = users.find(e => e.id == paramID);
    const index = users.indexOf(user);
    if(user){
        users.splice(index,1);
        res.status(200).send(`user deleted ${JSON.stringify(user)}`);
        fs.writeFileSync('users.json',JSON.stringify(users));
        return
    }else{
        res.status(404).send("User not found");
        return
    }
});

module.exports = router;

