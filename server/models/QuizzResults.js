const {mongoose} = require('./mongodb-connect')
const Config = require ('./ConfigQuizzResult')
const conf = require('./config.json')
//const bcrypt = require('bcryptjs')

let quizzSchemaResult = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    quizz: {
        type: Number,
        required:true
    },
    user: {
        type: Number,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    score:{
        type:Number
    },
    time: {
        type: Number,
    },
    answers: {
        type: [{
            question: String,
            correct: Boolean,
            time : Number,
            answer: String
        }],
        default: undefined,
    },
    /*correct:{ 
        type : Array , 
        "default" : [] }
        type:[{
            arr : {
                type:[{answer: String}]
            }
        }]
    }*/
});

//CREACION DE QUIZZ
quizzSchemaResult.statics.crearQuizz = async function(quizz){
    /*console.log(quizz)
    let newQuizz = Quizz(quizz);
    return await newQuizz.save()*/

    let qid = await Config.crearConfigOrUpdate(quizz)
    quizz.id = qid;
    //usr.password = bcrypt.hashSync(usr.password, 8)

    console.log(quizz)

    let newQuizz = Quizz(quizz);
    return await newQuizz.save()

}

//EDITAR USUARIO
quizzSchemaResult.methods.editarQuizz = function(datos){
    return Quizz.findOneAndUpdate(
                {_id:this._id},
                {$set:datos},
                {new: true}
                );
    
}

let Quizz = mongoose.model('quizzResult', quizzSchemaResult);

module.exports = Quizz;





