const express = require('express');
const router = express.Router();
const joi = require('joi');
const jwt = require('jsonwebtoken');
const fs = require('fs');

let users = JSON.parse(fs.readFileSync('users.json'));
let passwords = JSON.parse(fs.readFileSync('passwords.json'));

router.get("/", (req, res) => {
    res.send("Web Uquizz login");
});

router.post("/",(req,res) => {

    //Validation schema
    const schemaLogin = {
        email: joi.required(),
        password: joi.required()
    }

    //Validate if the data input is correct
    let result = joi.validate(req.body,schemaLogin);

    //If its not correct, return
    if(result.error){
        res.status(400).send(`Bad Request,${result.error.details[0].message}`);
        return
    }

    //if its correct, find a user to fetch from database matching account
    const validUser = users.find( e => e.email === req.body.email &&  e.password === req.body.password);

    if(!(validUser)){
        res.status(400).send("Invalid credentials");
    }else{
        
        let resBody = {};
        let privatePassword = "securePassword";
        //When a valid user is found, sign a token and send it back
        let token = jwt.sign({email:req.body.email, id:validUser.id},privatePassword,
                        {expiresIn:60*60*6} )

        resBody.token = token;
        resBody.firsName = validUser.firstName;
        resBody.id = validUser.id;
        resBody.admin = validUser.admin;
        //fs.writeFileSync('users.json',JSON.stringify(users));
        passwords.password = privatePassword;
        fs.writeFileSync('passwords.json',JSON.stringify(passwords));
        res.status(200).send(resBody);
    }
});


module.exports = router;
