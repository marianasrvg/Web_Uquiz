let mongoose = require('mongoose');
let config = require('./config.json');

//ASEGURATE DE TENER EL ARCHIVO config.json
//mongodb+srv://admin:<password>@cluster0-sjvuf.mongodb.net/test?retryWrites=true&w=majority
let mongodb = `mongodb+srv://${config.dbuser}:${config.dbpsw}@cluster0-sjvuf.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = {mongoose}

