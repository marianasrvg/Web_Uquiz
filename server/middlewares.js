const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs');
const User = require('../server/models/User');
const Quizz = require('./models/Quizz')

let privateTokenPassword = JSON.parse(fs.readFileSync('passwords.json'));
//let users = JSON.parse(fs.readFileSync('users.json'));

//---------------------------------------MIDDLEWARES----------------------------------------------------
//This middleware is used for operations you dont need to be admin but yo 
//Can only ask for your own ID
let adminValidator = async (req, res, next) => {
    // let validUser = users.find(e => e.id == req.body.id);
    // if(validUser.admin == 1){
    //     next(); 
    // }
    // else{
    //     res.status(400).send("You must be an admin");
    // } 

    let doc = undefined

    try {
        let ndoc = await User.findOne({
            id: req.body.id
        });
        if (!ndoc) {
            res.status(400).send("User doesn't exist");
            return;
        }
        if (ndoc.admin == 1) {
            next();
        } else {
            res.status(400).send("You must be an admin");
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: "Database error",
            detalle: err
        })
    }
}

//This middleware is used in all operations where a token needs to be active
let tokenValidator = (req, res, next) => {

    const userToken = req.header('x-auth-user');

    if (!userToken) {
        res.status(400).send('session token not found');
        return
    }

    let privatePassword = privateTokenPassword.password;

    jwt.verify(userToken, privatePassword, (err, decoded) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                res.status(401).send("token has expired");
                return;
            } else {
                res.status(400).send("invalid token");
                return;
            }
        }
        req.body.id = decoded.id;
    });
    next();
}

//This middleware is used for operations that you need to be admin to search
//other users or when you are searching for yourself without being admin
let permissionValidator = async (req, res, next) => {

    let doc = undefined

    try {
        let ndoc = await User.findOne({
            id: req.body.id
        });
        if (!ndoc) {
            res.status(400).send("User doesn't exist");
            return;
        }
        if (ndoc.admin == 1) {
            next();
            return;
        }
        let paramID = req.params.id;
        if (paramID == req.body.id) {
            next();
        } else {
            res.status(400).send("You can only search your own user or must be admin");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: "Database error",
            detalle: err
        })
    }
}

let ownershipValidator = async (req, res, next) => {
    let doc = undefined

    try {
        doc = await Quizz.findOne({
            creator: req.body.id,
            id: req.params.pin
        });
        if (!doc) {
            res.status(400).send("You can only search your own quizzes");
            return
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: "Database error",
            detalle: err
        })
    }
}

module.exports = {
    permissionValidator,
    tokenValidator,
    adminValidator,
    ownershipValidator
}