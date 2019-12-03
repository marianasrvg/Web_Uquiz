const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs');

let privateTokenPassword = JSON.parse(fs.readFileSync('passwords.json'));
let users = JSON.parse(fs.readFileSync('users.json'));
//---------------------------------------MIDDLEWARES----------------------------------------------------
//This middleware is used for operations you dont need to be admin but yo 
//Can only ask for your own ID
let adminValidator = (req,res,next) => {
    let validUser = users.find(e => e.id == req.body.id);
    if(validUser.admin == 1){
        next(); 
    }
    else{
        res.status(400).send("You must be an admin");
    }    
}

//This middleware is used in all operations where a token needs to be active
let tokenValidator = (req,res,next) => {

    const userToken = req.header('x-auth-user');
    
    if(!userToken){
        res.status(400).send('session token not found');
        return
    }

    let privatePassword = privateTokenPassword.password;

    jwt.verify(userToken, privatePassword,(err,decoded)=>{
        if(err){
            if(err.name == 'TokenExpiredError'){
                res.status(401).send("token has expired");
                return
            }else{
                res.status(400).send("invalid token");
                return
            }
        }
        req.body.id = decoded.id;
        //let decoded2 = jwt.decode(userToken,{complete:true});
        //req.body.id = decoded.id;
    });

    next();
}

//This middleware is used for operations that you need to be admin to search
//other users or when you are searching for yourself without being admin
let permissionValidator = (req,res,next) =>{
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
            res.status(400).send("You can only search your own user or must be admin");
        }  
    }
}

module.exports = {
    permissionValidator,
    tokenValidator,
    adminValidator
}