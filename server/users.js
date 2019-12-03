const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const joi = require('joi');
const jwt = require('jsonwebtoken');

let users = JSON.parse(fs.readFileSync('users.json'));
let passwords = JSON.parse(fs.readFileSync('passwords.json'));

app.use(express.json());

router.get("/", (req, res) => {
    //Mostrar todos los usuarios
    //Middleware token-auth
    //Middleware isAdmin 
});

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


//---------------------------------------MIDDLEWARES----------------------------------------------------
let userValidator = (req,res,next) => {


    let idParam = req.param.id;
    let user = users.find(e => e.id == idParam);
    console.log(idParam);
    console.log(user.id);
    
    if(user.id == req.body.id){
        next();
    }else{
        res.status(401).send("Permission Denied, you must be an admin to see other users");
        return
    }
    
}

let tokenValidator = (req,res,next) => {

    const userToken = req.header('x-auth-user');
    
    if(!userToken){
        res.status(401).send('session token not found');
        return
    }


    let userPassword = passwords.password;

    jwt.verify(userToken, userPassword,(err,decoded)=>{
        if(err){
            if(err.name == 'TokenExpiredError'){
                res.status(403).send("token has expired");
                return
            }else{
                res.status(401).send("invalid token");
                return
            }
        }
        req.body.id = decoded.id;
        //let decoded2 = jwt.decode(userToken,{complete:true});
        //req.body.id = decoded.id;
    });

    next();
}

let adminValidator = (req,res,next) =>{
    let validUser = users.find(e => e.id == req.body.id);
    let paramID = req.params.id;
    console.log(validUser);
    if(validUser.admin == 1){
        next(); 
    }
    else{
        if(paramID == req.body.id){
            next();
        }else{
            res.status(401).send("You can only search your own user or must be admin");
        }  
    }
}


router.get('/:id',tokenValidator,adminValidator, (req,res)=>{
    let paramID = req.params.id;
    res.send(paramID);
    console.log("YA JALA ADMIN");
});

router.put('/:id',tokenValidator,(req,res)=>{
    let paramID = req.params.id;
    let user = users.find(e => e.id == paramID);
    const index = users.indexOf(user);

    const schemaEdit = {
        firstName: joi.required(),
        lastName: joi.required(),
        email: joi.required(),
        admin: joi.required(),
        password: joi.required()
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

module.exports = router;

