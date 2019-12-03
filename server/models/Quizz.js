const {mongoose} = require('./mongodb-connect')
const Config = require ('./ConfigQuizz')
const conf = require('./config.json')
//const bcrypt = require('bcryptjs')

let quizzSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String
    },
    creator: {
        type: String,
    },
    bestScore:{
        type: Number,
    },
    worstScore:{
        type: Number,
    },
    played:{
        type: Number,
    },
    questions: {
        type: [{
            question: String,
            time : Number,
            answers: {
                type: [{
                    answer: String,
                    correct : Boolean
                }],
                default: undefined
            }
        }],
        default: undefined,
    },
    correct:{ 
        type : Array , 
        "default" : [] }
        /*type:[{
            arr : {
                type:[{answer: String}]
            }
        }]
    }*/
});

//CREACION DE QUIZZ
quizzSchema.statics.crearQuizz = async function(quizz){
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

//OBTENER USUARIOS
quizzSchema.statics.obtenerUsuarios = function(){
    return Quizz.findOne({}); 
}

//EDITAR USUARIO
quizzSchema.methods.editarQuizz = function(datos){
    return Quizz.findOneAndUpdate(
                {_id:this._id},
                {$set:datos},
                {new: true}
                );
    
}

let Quizz = mongoose.model('Quizzes', quizzSchema);

module.exports = Quizz;





